const $navToggler = $('.navbar-toggler')

$($navToggler).on("click", function () {
    $(this).parents('.navbar').toggleClass('top-nav__mobile-collapse');
    
    if (!this.classList.contains("is-active")) {
        this.classList.add("is-active")
    } else {
        this.classList.remove("is-active")
    }
})

const filter_tab_placeholder = $(".nav-filter-wrapper .placeholder a")
const filter_tab_placeholder_default_value = "Выбрать"
const filter_tab_placeholder_text = filter_tab_placeholder.text()

$(".nav-filter-wrapper li").on("click", event => {
    const selectedValue = $(event.target).data("type")

    if ($(event.target).is(filter_tab_placeholder)) {
        (filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value)
        $(".nav-filter-wrapper").toggleClass("is-open")
    } else if (filter_tab_placeholder.attr("data-type") == selectedValue) {
        filter_tab_placeholder.text($(event.target).text())
        $(".nav-filter-wrapper").removeClass("is-open")
    } else {
        $(".nav-filter-wrapper").removeClass("is-open")
        filter_tab_placeholder.text($(event.target).text()).attr("data-type", selectedValue)
        filter_tab_placeholder_text = $(event.target).text()

        $(".nav-filter-wrapper .active").removeClass("selected")
        $(event.target).addClass("selected")
    }
})