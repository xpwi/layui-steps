/*
 steps组件
 */
layui.use(['jquery', 'steps'], function () {

    const $ = layui.$;

    const $step = $("#step_demo").step();

    $("#preBtn").click(function (event) {
        // 上一步
        $step.preStep();
    });
    $("#nextBtn").click(function (event) {
        // 下一步
        $step.nextStep();
    });
    $("#goBtn").click(function (event) {
        // 到指定步
        $step.goStep(3);
    });
});
