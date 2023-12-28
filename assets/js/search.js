"use strict";
$(function () {
  let root = location.pathname.replace(/\/[^\/]+$/, "");
  $.getScript("https://cdn.jsdelivr.net/npm/algoliasearch@4.17.2/dist/algoliasearch-lite.umd.js", () => {
    $.getScript("https://cdn.jsdelivr.net/npm/instantsearch.js@4.56.2/dist/instantsearch.production.min.js", () => {
      let search = instantsearch({
        indexName: "xzonn_games",
        searchClient: algoliasearch("EMOU93HL1O", "b36d5bb76beaebd183994786b8c7d8d6"),
      });

      let hitTemplate = function (hit) {
        let url = hit.external_url || hit.url,
          title = hit._highlightResult.title.value,
          tags = (hit._highlightResult.tags || []).map((x) => x.value),
          content = (hit._highlightResult.content || []).value,
          screenshot_captions = (hit._highlightResult.screenshot_captions || [])
            .filter((x) => x.matchLevel !== "none")
            .map((x) => x.value);

        let defineList = $("<dl/>").addClass("ga-search-list-item"),
          _title = $("<dt/>")
            .addClass("ga-search-list-title")
            .append(
              $("<a/>")
                .attr({
                  "href": root + url,
                })
                .html(title)
            )
            .appendTo(defineList),
          _tags = tags.length
            ? $("<dd/>")
                .addClass("ga-search-list-tags")
                .append($("<ul/>").append(tags.map((x) => $("<li/>").html(`<a href="${root}/#${x}">${x}</a>`))))
                .appendTo(defineList)
            : null,
          _content = $("<dd/>")
            .addClass("ga-search-list-content")
            .html(
              (!hit._highlightResult.content || hit._highlightResult.content.matchLevel === "none") &&
                screenshot_captions.length > 0
                ? screenshot_captions[0]
                : content
            )
            .appendTo(defineList);

        Han(defineList[0]).render();
        return defineList[0].outerHTML;
      };

      search.addWidget(
        instantsearch.widgets.searchBox({
          container: ".ga-search-searchbar",
          placeholder: "请输入关键词",
          cssClasses: {
            "form": "input-group",
            "input": "form-control",
            "submit": "btn btn-primary",
            "reset": "btn btn-primary",
          },
          searchAsYouType: false,
        })
      );
      search.addWidget(
        instantsearch.widgets.hits({
          container: ".ga-search-hits",
          templates: {
            item: hitTemplate,
            empty: "无结果",
          },
        })
      );
      search.addWidget(
        instantsearch.widgets.poweredBy({
          container: ".ga-search-poweredby",
        })
      );
      search.start();
    });
  });

  let submitTimeout;
  $(".ga-search-searchbar")
    .on("keyup", (e) => {
      if (!$(e.target).is(".ais-SearchBox-input")) {
        return;
      }
      if (submitTimeout) {
        clearTimeout(submitTimeout);
      }
      submitTimeout = setTimeout(() => {
        $(".ais-SearchBox-submit").trigger("click");
        $(".ais-SearchBox-input")[0].focus();
      }, 500);
    })
    .on("keydown", (e) => {
      if (!$(e.target).is(".ais-SearchBox-input")) {
        return;
      }
      if (submitTimeout) {
        clearTimeout(submitTimeout);
      }
    });
});
