layui.define(['jquery'], function (exports) {
    "use strict";
    const $ = layui.$;
    $.fn.step = function (options) {
        const opts = $.extend({}, $.fn.step.defaults, options);
        // 总步骤个数
        const size = this.find(".step-header li").length;
        let barWidth = opts.initStep < size ? 100 / (1 * size) + 100 * (opts.initStep - 1) / size : 100;
        let curPage = opts.initStep;
        const steps = this;
        const bar_w = (100 - (100 / size)) + '%';
        this.find(".step-header").prepend("<div class=\"step-bar\" style='width:" + bar_w + "'><div class=\"step-bar-active\"></div></div>");
        this.find(".step-list").eq(opts.initStep).show();
        if (size < opts.initStep) {
            opts.initStep = size;
        }
        if (opts.animate === false) {
            opts.speed = 0;
        }
        this.find(".step-header li").each(function (i, li) {
            if (i === 0) {
                $(li).addClass("step-current")
                    .append('<a href="javascript:;" class="jump-steps" data-step="' + (i + 1) + '">' + (i + 1) + '</a>');
            } else if (i < opts.initStep) {
                $(li).addClass("step-active")
                    .append('<a href="javascript:;" class="jump-steps" data-step="' + (i + 1) + '"></a>');
            } else {
                $(li).append('<a href="javascript:;" class="jump-steps" data-step="' + (i + 1) + '">' + (i + 1) + '</a>');
            }
        });
        this.find(".step-header li").css({
            "width": 100 / size + "%"
        });
        this.find(".step-header").show();
        this.find(".step-bar-active").animate({
                "width": barWidth + "%"
            },
            opts.speed, function () {

            });

        this.find(".jump-steps").on('click', function () {
            const step_id = $(this).attr("data-step");
            steps.goStep(step_id);
        });

        // 下一步
        this.nextStep = function () {
            if (curPage >= size) {
                return false;
            }
            const next_step_num = curPage === 0 ? 2 : curPage + 1 === size ? size : curPage + 1;
            return this.goStep(next_step_num);
        };

        // 上一步
        this.preStep = function () {
            if (curPage <= 1) {
                return false;
            }
            const pre_step_num = curPage === 1 ? 1 : curPage - 1;
            return this.goStep(pre_step_num);
        };

        // 跳到指定步骤
        this.goStep = function (page) {
            if (page === undefined || isNaN(page) || page < 0) {
                if (window.console && window.console.error) {
                    console.error('the method goStep has a error,page:' + page);
                }
                return false;
            }
            curPage = parseInt(page);
            this.find(".step-list").hide();
            this.find(".step-list").eq(curPage - 1).show();
            this.find(".step-header li").each(function (i, li) {
                const $li = $(li);
                $li.removeClass('step-current')
                    .removeClass('step-active');
                $li.find("a").html(i + 1);
                if ((i + 1) < page) {
                    $li.addClass('step-active');
                    $li.find("a").empty();
                    if (opts.scrollTop) {
                        $('html,body').animate({scrollTop: 0}, 'slow');
                    }
                } else if ((i + 1) === page) {
                    $li.addClass('step-current');
                }
            });
            const bar_rate = 100 / (100 - (100 / size));

            barWidth = page < size ? (100 / (2 * size) + 100 * (page - 1) / size) * bar_rate : 100;
            this.find(".step-bar-active").animate({
                    "width": barWidth + "%"
                },
                opts.speed, function () {

                });
            return true;
        };
        return this;
    };
    $.fn.step.defaults = {
        animate: true,
        speed: 200,
        initStep: 0,
        scrollTop: true
    };

    exports('steps', $);
});
