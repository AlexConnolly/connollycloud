/* Shared post loading for connolly.cloud. Reads posts.json (a map of
   user id -> array of markdown filenames) and fetches the post files.
   Filenames are prefixed YYYY-MM-DD, so we can sort newest-first without
   opening them — and only fetch the few we actually need. Depends on
   markdown.js (window.md). */
(function (global) {
  "use strict";

  function slugOf(file) {
    return file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
  }

  function dateFromFilename(file) {
    var m = /^(\d{4}-\d{2}-\d{2})/.exec(file);
    return m ? m[1] : null;
  }

  function sortByFilenameDate(files) {
    return files.slice().sort(function (a, b) {
      return (dateFromFilename(b) || "").localeCompare(dateFromFilename(a) || "");
    });
  }

  // Returns a promise of post objects { slug, file, title, date, body },
  // newest first. Pass a limit to only fetch that many of the latest.
  function load(userId, limit) {
    return fetch("posts.json")
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; })
      .then(function (manifest) {
        var files = sortByFilenameDate((manifest && manifest[userId]) || []);
        if (limit) files = files.slice(0, limit);
        return Promise.all(files.map(function (file) {
          return fetch("posts/" + userId + "/" + file)
            .then(function (r) { return r.ok ? r.text() : null; })
            .then(function (text) {
              if (text == null) return null;
              var parsed = md.parse(text);
              return {
                slug: slugOf(file),
                file: file,
                title: parsed.meta.title || "",
                date: parsed.meta.date || dateFromFilename(file) || "",
                body: parsed.body
              };
            })
            .catch(function () { return null; });
        }));
      })
      .then(function (posts) {
        return posts.filter(Boolean).sort(function (a, b) {
          return (b.date || "").localeCompare(a.date || "");
        });
      });
  }

  global.posts = { load: load, slugOf: slugOf };
})(window);
