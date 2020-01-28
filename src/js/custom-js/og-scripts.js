$(document).ready(function() {
    // grecaptcha.ready(function () {
    //         grecaptcha.execute('6LfiqcMUAAAAAKjUwS_ifIuJUPNLkQHQ44PgayWy', { action: 'check' }).then(function (token) {
    //         const discountFirstOrderResponse = document.querySelector('#discount-first-order');
    //         discountFirstOrderResponse.value = token;

    //         const specialOfferResponse = document.querySelector('#special-offer');
    //         specialOfferResponse.value = token;

    //         const callbackResponse = document.querySelector('#callback-form')
    //         callbackResponse.value = token;

    //         const productOrderResponse = document.querySelector('#product-order')
    //         productOrderResponse.value = token

    //         const orderWithDiscountDay = document.querySelector('#order-with-discount-day')
    //         orderWithDiscountDay.value = token
    //     });
    // });

    let $data = {}
    const ua = navigator.userAgent.toLowerCase()
    
    function createStringWithDate (parents) {
        const date = new Date()

        const formatter = new Intl.DateTimeFormat("ru", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        
        let hour = date.getHours()
        let minute = date.getMinutes()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
    
        if (hour < 10) {
            hour = "0" + hour
        }
        if (minute < 10) {
            minute = "0" + minute
        }
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month  = "0" + month
        }

        return ((/trident/gi).test(ua) || (/msie/gi).test(ua)) ? (parents.find(".form-subject").html() + " [" + day + "." + month + "." + year + ", " + hour + ":" + minute + "]") : (parents.find(".form-subject").html() + " [" + formatter.format(new Date().getTime()) + "]")
    }
    
    $(".modal-dialog form, form").on("submit", function(){
        return false    
    })
    
    $(".form-check-input").parents("form").find("button.form-submit,input.form-submit").attr("disabled","disabled")
    $('.form-check-input').prop("checked", false)
    $(".form-check-input").on("click", function(event){
        const el = $(this).parents("form").find("button.form-submit,input.form-submit")
        const currentStateCheckBox = event.target.checked

        if (el.attr("disabled") && currentStateCheckBox) {
            el.removeAttr("disabled")
        } else {
            el.attr("disabled","disabled")
        }
    })
    
    $('[data-target="#modalOrder"]').on("click", function() {
        $("#modalOrder .mdb-select option[value='" + $(this).data('id') + "']").attr("selected", "selected")
    })

    $("#vehicles-categories button.btn").on("click", function(e){
        const _href = $("#vehicles")
        
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"})
        $('#vehicles .nav a[href="' + $(this).data("tab")  +'"]')[0].click()
        
        e.preventDefault()

        return false  
    })
    
    $("button[data-ze]").on("click", function(e){
        const _href = $(this).data("ze")
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"})
        e.preventDefault()
        return false
    })

    $(".input_tel").inputmask({"mask": "+7 (999) 999 99 99"})

    $(".form-submit").on("click", function(e) {
        (e.preventDefault) ? e.preventDefault() : e.returnValue = false
        
        const parents = $(this).parents("form")
        const preloader = $(".preload-wrapper")
        const errors = []

        let timer = null
        $data = {}

        function checkFields () {
            parents.find("input[data-validate], select[data-validate]").each(function(fieldName, inputElement) {
                if ($(inputElement).val().trim().length === 0) {
                    errors.push({
                        errorField: $(inputElement).attr('name'),
                        description: `Поле "${$(inputElement).next().html()}" обязательно для заполнения.`
                    })

                    for (const invalid of errors) {
                        parents.find("[name='" + invalid.errorField + "']").addClass("invalid")
                    }
                } else { 
                    switch ($(inputElement).attr("name").toLowerCase()) {
                        case "name":
                            if (!(/^[a-zA-Z]+$/iu).test($(inputElement).val().trim().toLowerCase()) && !(/^[а-яёА-Я]+$/iu).test($(inputElement).val().trim().toLowerCase())) {
                                errors.push({
                                    errorField: $(inputElement).attr("name"),
                                    description: `Поле "${$(inputElement).next().html()}" должно содержать символы только русского или латинского алфавита.`
                                })
                            }
                        break;
                        case "tel":
                            const templatePhone = /^((8|\+7)[\- ]?)(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

                            if (!templatePhone.test($(inputElement).val().trim().toLowerCase())) {
                                errors.push({
                                    errorField: $(inputElement).attr('name'),
                                    description: `Поле "${$(inputElement).next().html()}" имеет некорректный формат.`
                                })
                            }
                        break;
                        case "weight":
                            if (isNaN($(inputElement).val().trim().toLowerCase()) || $(inputElement).val().trim().toLowerCase() < 0) {
                                errors.push({
                                    errorField: $(inputElement).attr("name"),
                                    description: `Значение поля"${$(inputElement).next().html()}" должно быть положительным числом.`
                                })
                            }
                        break;
                        case "items":
                            for (let i = 0, length = inputElement.options.length; i < length; i++) {
                                if (inputElement.options[i].dataset.value === "defalt" && (inputElement.options[i].selected)) {
                                    errors.push({
                                        errorField: $(inputElement).attr("name"),
                                        description: "Вы не выбрали продукцию."
                                    })
                                }
                            }
                        break;
                    }
                }
            })

            for (const invalid of errors) {
                parents.find("[name='" + invalid.errorField + "']").addClass("invalid")
            }

            for (const error of errors) {
                parents.find(".form-errors").append(`<p>${error.description}</p>`)
            }
        }

        sendDataToServer()
        function sendDataToServer () {
            $data.subject = createStringWithDate(parents)
            parents.find(".form-errors").css({display: "block", opacity: 1})
            parents.find(".form-errors").empty()

            parents.find("input, textearea").each(function() {
                if (!$(this).data("activates")) $data[this.name] = $(this).val()
            })
            
            parents.find("select").each(function() {
                if (!$(this).data("activates")) $data[this.name] = $(this).find("option:selected").text()
            })
            
            checkFields()

            if (errors.length === 0) {
                $.ajax({
                    url: "/wp-content/themes/sts-msk-pro/mail.php",            
                    type: "post",
                    data: $data,
                    beforeSend: function () {
                        startTime = new Date().getTime()
                        
                        timer = setTimeout(() =>  {
                            $("body").css("overflow", "hidden")
                            $(preloader).show()
                        }, 2000);
                    },
                    success: function (response, textStatus) {
                        const data = JSON.parse(response)
                        if (data.checked_fields) {
                            parents.find("input").removeClass("invalid");
                            for (const message of data.errors) {
                                parents.find(".form-errors").append(`<p>${message}</p>`).delay(2000).fadeOut(2000)
                                $(".form-check-input:checked").prop("checked", false);
                                $("button.form-submit,input.form-submit").attr("disabled","disabled")
                                parents.find("input, textarea").each(function (index, item) {
                                    switch ($(item).attr("type")) {
                                        case "text":
                                            if (!$(item).hasClass("select-dropdown") && !$(item).hasClass('input_items')) {
                                                $(item).val("")
                                            }
                                        break;
                                        case "number":
                                            $(item).val(1)
                                        break;
                                    }
                                })
                            }
                        } else {
                            for (const error of data.errors) {
                                parents.find('form-errors').append($(`<p>${error}</p>`).delay(500).slideDown(300))
                            }
    
                            for (const invalid of data.invalid_fields) {
                                parents.find("[name='" + invalid.field + "']").addClass("invalid")
                            }
                        }
                    },
                    complete: function () {
                        clearTimeout(timer)
                        $("body").css("overflow", "visible")
                        $(preloader).hide()
                    }
                });
            }
        }
    });

    $("input").on("change", function(){
        $(this).removeClass("invalid")
    });

    const imageStates = [{grayscale: "logo-stroytransgaz_bw.jpg", color: "logo-stroytransgaz.png"},
                        {grayscale: "logo-rosneft_bw.jpg", color: "logo-rosneft.png"},
                        {grayscale: "logo-transneft_bw.jpg", color: "logo-transneft.png"},
                        {grayscale: "logo-stroygazmontazh_bw.jpg", color: "logo-stroygazmontazh.png"},
                        {grayscale: "logo-velesstroy_bw.jpg", color: "logo-velesstroy.png"},
                        {grayscale: "logo-gazstroyproekt_bw.jpg", color: "logo-gazstroyproekt.png"}]

    function changeColorImage (eventType, event) {
        if (event.target.tagName.toLowerCase() === "img") {
            switch (eventType) {
                case "mouseout":
                    imageStates.forEach(imgState => {
                        if (event.target.src.includes(imgState.color)) {
                            event.target.src = event.target.src.replace(imgState.color, imgState.grayscale)
                        }
                    })
                break;
                case "mouseover": 
                    imageStates.forEach(imgState => {
                        if (event.target.src.includes(imgState.grayscale)) {
                            event.target.src = event.target.src.replace(imgState.grayscale, imgState.color)
                        }
                    })
                break;
            }
        }
    }

    changeImageForIE()
    function changeImageForIE () {
        if ((/trident/gi).test(ua) || (/msie/gi).test(ua)) {
            const partnersImages = $('.partners-img')
            const partnersImgElement = $('.partners-img-wrapper')

            $(partnersImages).each(function(index, img) {
                for (let index in imageStates) {
                    if (img.src.includes(imageStates[index].color)) {
                        img.src = img.src.replace(imageStates[index].color, imageStates[index].grayscale)
                    }
                }
            })

            $(partnersImgElement).on('mouseout', event => {
                changeColorImage('mouseout', event)
            })

            $(partnersImgElement).on('mouseover', event => {
                changeColorImage('mouseover', event)
            })
        }
    }
});