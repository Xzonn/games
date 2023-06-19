$(() => {
  setTimeout(() => {
    $.getScript("https://cdn.jsdelivr.net/npm/tablesorter@2.31.2/dist/js/jquery.tablesorter.combined.min.js", () => {
      $(".tablesorter").tablesorter();
    });
  });

  /* 标签页处理 */
  setTimeout(() => {
    let handleHashChange = function (e) {
      let hash = decodeURIComponent(location.hash).slice(1);
      $(".ga-taglist > li > a").removeClass("active");
      $(`#tag-${hash} > a`).addClass("active");
      if (hash) {
        $(".ga-postlist > tbody > tr").each(function () {
          if (
            $(this)
              .find("td")
              .toArray()
              .some((x) => x.innerText.trim() == hash)
          ) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });

        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
      } else {
        $(".ga-postlist > tbody > tr").show();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
  });
});
