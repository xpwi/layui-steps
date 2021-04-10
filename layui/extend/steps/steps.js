layui.define(['jquery'], function (exports) {
    "use strict";
    const $ = layui.$;
    $.fn.step = function (options) {
        const opts = $.extend({}, $.fn.step.defaults, options);
        // 总步骤个数
        const totalSize = this.find(".step-header li").length;
        let barWidth = opts.initStep < totalSize ? 100 / (1 * totalSize) + 100 * (opts.initStep - 1) / totalSize : 100;
        // 当前步骤
        let currentStep = opts.initStep;
        const steps = this;
        const bar_w = (100 - (100 / totalSize)) + '%';
        this.find(".step-header").prepend("<div class=\"step-bar\" style='width:" + bar_w + "'><div class=\"step-bar-active\"></div></div>");
        this.find(".step-list").eq(opts.initStep).show();
        if (totalSize < opts.initStep) {
            opts.initStep = totalSize;
        }
        if (opts.animate == false) {
            opts.speed = 0;
        }
        this.find(".step-header li").each(function (i, li) {
            if (i == 0) {
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
            "width": 100 / totalSize + "%"
        });
        this.find(".step-header").show();
        this.find(".step-bar-active").animate({
            "width": barWidth + "%"
        }, opts.speed, function () {
        });
        this.find(".jump-steps").on('click', function () {
            const step_id = $(this).attr("data-step");
            steps.goStep(step_id);
        });

        // 下一步
        this.nextStep = function () {
            if (currentStep >= totalSize) {
                return false;
            }
            const next_step_num = currentStep == 0 ? 2 : currentStep + 1 == totalSize ? totalSize : currentStep + 1;
            return this.goStep(next_step_num);
        };

        // 上一步
        this.preStep = function () {
            if (currentStep <= 1) {
                return false;
            }
            const pre_step_num = currentStep == 1 ? 1 : currentStep - 1;
            return this.goStep(pre_step_num);
        };

        // 跳到指定步骤
        this.goStep = function (page) {
            if (page == undefined || isNaN(page) || page < 0) {
                if (window.console && window.console.error) {
                    console.error('the method goStep has a error,page:' + page);
                }
                return false;
            }
            currentStep = parseInt(page);
            // console.log(currentStep);
            this.find(".step-list").hide();
            this.find(".step-list").eq(currentStep - 1).show();
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
                } else if ((i + 1) == page) {
                    $li.addClass('step-current');
                }
            });
            const bar_rate = 100 / (100 - (100 / totalSize));

            barWidth = page < totalSize ? (100 / (2 * totalSize) + 100 * (page - 1) / totalSize) * bar_rate : 100;
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
