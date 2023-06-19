$(() => {
  /* 目录监听 */
  setTimeout(() => {
    let toc = $(".ga-sidenav-list");
    let links = Array.from(toc.find("a.nav-link"));
    let targets = links.map((link) => $(link.attributes.href.value)[0]);
    targets.forEach((target, target_index) => {
      let observer = new IntersectionObserver(
        () => {
          toc.find("a.nav-link.active").removeClass("active");
          for (let i = target_index; i > -1; i--) {
            let target = targets[i];
            if ($(target).offset().top <= window.scrollY) {
              let parents = $(links[i]).parentsUntil(".ga-sidenav-list");
              parents.children().filter("a.nav-link").addClass("active");
              return;
            }
          }
        },
        {
          threshold: [0.95, 1.0],
        }
      );
      observer.observe(target);
    });
  }, 0);

  /* 轮播设置 */
  setTimeout(() => {
    let items = $(".ga-carousel .carousel-item");
    let items_length = items.length;
    let load_image = (event) => {
      let left = (event.to - 1 + items_length) % items_length;
      let right = (event.to + 1) % items_length;
      for (item_index of [left, right]) {
        let item = items[item_index];
        $(item).find("img").removeAttr("loading");
      }
    };
    $(".ga-carousel").on("slide.bs.carousel", load_image);
    load_image({ to: 0 });
  }, 0);

  /* Han.js */
  setTimeout(() => {
    Han(document.body).render();
  }, 0);
});
