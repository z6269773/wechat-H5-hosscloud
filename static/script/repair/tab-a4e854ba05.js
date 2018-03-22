/**
 * tab选项卡.js 选择
 */
$(function(){
 
    $('.nav.nav-tabs li a').click(function(){

        var $this = $(this);
        var selector;

        if (!selector) {
            selector = $this.data('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return

        $('.nav.nav-tabs li').removeClass('active')
        $this.parent('li').addClass('active')
        $('.tab-content .tab-pane').removeClass('active')
        $(selector).addClass('active')
    })
})