<template>
    <div class="summery-statics">
        <Row class="date" type="flex" justify="start">
            <Col span="6">
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </Col>
        </Row>

        <Row class="visitors">
            <Col span="4">
                <Row class="visitor-icon">
                    <Icon type="ios-contacts" />
                </Row>
                <Row class="">访问</Row>
            </Col>
            <Col span="4">
                <Row class="visitor-num">访客数</Row>
                <Row>{{visitorsNum}}</Row>
            </Col>
            <Col span="4">
                <Row class="visitor-num">浏览量</Row>
                <Row>{{browseNum}}</Row>
            </Col>
            <Col span="4">
                <Row class="visitor-num">访问次数</Row>
                <Row>{{requestNum}}</Row>
            </Col>
        </Row>

        <Row class="dialog">
            <Col span="4">
                <Row class="dialog-icon"></Row>
                <Row class="">对话</Row>
            </Col>
            <Col span="4">
                <Row class="dialog-num">总对话数</Row>
                <Row>{{dialogNum}}</Row>
            </Col>
            <Col span="4">
                <Row class="valid-num">有效对话数</Row>
                <Row>{{validNum}}</Row>
            </Col>
        </Row>

        <Row class="queue">
            <Col span="4">
                <Row class="queue-icon"></Row>
                <Row>排队</Row>
            </Col>
            <Col span="4">
                <Row class="queue-num">排队数</Row>
                <Row>{{queueNum}}</Row>
            </Col>
            <Col span="4">
                <Row class="giveup-num">放弃排队数</Row>
                <Row>{{giveupNum}}</Row>
            </Col>
            <Col span="4">
                <Row class="average-time">平均放弃排队时长</Row>
                <Row>{{averageGiveipTime}}</Row>
            </Col>
            <Col span="4">
                <Row class="average-time">平均排队时长</Row>
                <Row>{{averageTime}}</Row>
            </Col>
            <Col span="4">
                <Row class="longest-time">最长排队时长</Row>
                <Row>{{longestTime}}</Row>
            </Col>
        </Row>

        <Row class="statics-ec" id="summeryStatics"></Row>

        <Row class>
            <Col span="12">
                <div id="firstResponseTime"></div>
            </Col>
            <Col span="12">
                <div id="averageResponseTime"></div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default{
    name: 'SummeryStatics',
    data(){
        return {
            visitorsNum: 0,
            browseNum: 0,
            requestNum: 0,
            dialogNum: 0,
            validNum: 0,
            queueNum: 0,
            giveupNum: 0,
            averageGiveipTime: 0,
            averageTime: 0,
            longestTime: 0
        }
    }
}
</script>
<style lang="less" scoped>
.summery-statics{
    .visitors,.dialog,.queue{
        height: 64px;
    }
    .visitor-icon{

    }
}
</style>