const $navToggler = $('.navbar-toggler')

$($navToggler).on("click", function () {
    $(this).parents('.navbar').toggleClass('top-nav__mobile-collapse');
    
    if (!this.classList.contains("is-active")) {
        this.classList.add("is-active")
    } else {
        this.classList.remove("is-active")
    }
})

$('.carousel').carousel()