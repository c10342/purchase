<!--商品列表-->
<template>
  <div class="goods_list_one">
    <div class="trip_card_main">
      <!--左边商品图片部分-->
      <a @click.prevent href="javascript:;" class="card_pic">
        <span>1</span>
        <img v-lazy="listDetail.imageUrl" alt="" class="image">
      </a>
      <!--右边商品描述部分-->
      <div class="card_desc">
        <div class="card_desc_top">
          <a @click.prevent href="//www.meituan.com/cate/61734/"
             class="link item_title" target="_blank">{{listDetail.shopName}}</a>
          <!-- <div class="item_eval_info clearfix">
						<span class="score_info">
							<div class="rate_stars">
								<ul class="rate_stars_ul rate_stars_dark">
									<li>
										<i class="el-icon-star-on"></i>
									</li>
									<li><i class="el-icon-star-on"></i></li>
									<li><i class="el-icon-star-on"></i></li>
									<li><i class="el-icon-star-on"></i></li>
									<li><i class="el-icon-star-on"></i></li>
								</ul>
								<ul class="rate_stars_ul rate_stars_light" style="width:100%">
									<li><i class="el-icon-star-on"></i></li>
									<li><i class="el-icon-star-on"></i></li>
									<li><i class="el-icon-star-on"></i></li>
									<li><i class="el-icon-star-on"></i></li>
									<li><i class="el-icon-star-on"></i></li>
								</ul>
							</div>
							<span>很好</span>
							<span>5分</span>
							<span class="highlight">109266人评论</span>
						</span>
          </div> -->

          <div class="item_site_info ellipsis clearfix">
            <span>{{listDetail.goodsCategory}} </span>
            <span>{{listDetail.shopLocation}}</span>
            <div class="item_site_map">
              <i class="el-icon-location"></i>
              <span class="map" @click.stop="goToMap">查看地图</span>
            </div>
          </div>

          <div class="item_price_info">
						<span>
							<span class="yuan">￥</span><span class="price_number">{{listDetail.discountPrice}}</span><span class="price_desc">起</span>
						</span>
          </div>

        </div>

        <div class="card_desc_bottom">
          <div class="abstract_list">
            <!-- <div title="双人票390元起，成人票190元起，学生票185元起，儿童票175元起，多景点联票200元起" class="abstract_box">
              <img src="//p0.meituan.net/feop/a2e7935d9e4b1780e22b3bcd8c903f211186.png"
                   class="image abstract_icon abstract_icon_img">
              <span class="abstract-message">双人票390元起，成人票190元起，学生票185元起，儿童票175元起，多景点联票200元起</span>
            </div>
            <div
              title="维福顿公寓+广州长隆欢乐世界240元，广州长隆集团香江大酒店1晚/2晚+双人/2大1小/3人野生动物园/欢乐世界/水上乐园/大马戏+双人/2大1小/3人双人自助早餐等多套餐可选588元，奥美家国际公寓288元，广州水悦年华酒店1晚+双人长隆欢乐世界/野生动物世界/长隆国大马戏+双人自助早餐等多种套餐可选405元，星驿国际度假公寓1晚+双人/3人/2大1小广州长隆欢乐世界/广州长隆野生动物园/广州长隆大马戏/广州长隆飞鸟乐园等多套餐可选160元"
              class="abstract_box">
              <img src="//p1.meituan.net/feop/6ac7e8bf70c6e26970cd94b83a7ee0551537.png"
                   class="image abstract_icon abstract_icon_img">
              <span class="abstract_message">维福顿公寓+广州长隆欢乐世界240元，广州长隆集团香江大酒店1晚/2晚+双人/2大1小/3人野生动物园/欢乐世界/水上乐园/大马戏+双人/2大1小/3人双人自助早餐等多套餐可选588元，奥美家国际公寓288元，广州水悦年华酒店1晚+双人长隆欢乐世界/野生动物世界/长隆国大马戏+双人自助早餐等多种套餐可选405元，星驿国际度假公寓1晚+双人/3人/2大1小广州长隆欢乐世界/广州长隆野生动物园/广州长隆大马戏/广州长隆飞鸟乐园等多套餐可选160元</span>
            </div> -->
            <div
              class="abstract_box">
              <img src="//p0.meituan.net/feop/70149c6d8425e25946f28f988fa1739c1339.png"
                   class="image abstract_icon abstract_icon_img">
              <span class="abstract_message">{{listDetail.goodsDesc}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    listDetail:{
      type:Object
    }
  },
  methods:{
    goToMap(){
      this.$router.push({
        name:'map',
        query:{
          location:this.listDetail.shopLocation
        }
      })
    }
  }
}
</script>


<style scoped>
.map{
  cursor: pointer;
}
  .trip_card_main {
    padding: 20px 0;
    min-height: 125px;
    border-top: 1px solid #E5E5E5;
  }

  /* 左边商品图片部分样式 */
  .card_pic {
    background-color: #f4f4f4;
    position: absolute;
    height: 125px;
    width: 220px;
    border-radius: 4px;
  }

  .card_pic span {
    background: #FB6433;
    border-radius: 2px;
    position: absolute;
    line-height: 13px;
    width: 20px;
    margin-left: -3px;
    margin-top: 3px;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }

  .image {
    width: 100%;
    border-radius: 4px;
  }

  /* 右边商品描述部分样式 */
  .card_desc {
    margin-left: 220px;
    padding-left: 20px;
    font-size: 12px;
    color: #666;
    overflow: hidden;

  }

  /* 右边商品描述顶部 */
  .card_desc_top {
    position: relative;
    padding-bottom: 10px;
  }

  .trip_card_main .card_desc .card_desc_top .item_title {
    font-weight: 500;
    font-size: 16px;
    color: #333;
    text-decoration: none;
  }

  .item_eval_info {
    margin-left: -4px;
    margin-top: 10px;
  }

  /*评分*/
  .rate_stars {
    width: 84px;
    height: 24px;
    position: relative;
    display: inline-block;
  }

  .rate_stars_ul {
    list-style: none;
    padding: 0;
    text-align: left;
    margin: 3px 0;
    white-space: nowrap;
  }

  /*隐藏失分星星*/
  .rate_stars_dark {
    color: #c3c3c3;
  }

  .rate_stars_light {
    color: #F90;
    position: absolute;
    top: 0;
    overflow: hidden;
  }

  .rate_stars_ul > li {
    display: inline-block;
    padding: 0 2px;
    color: skyblue;
  }

  .score_info span {
    margin-left: 10px;
  }

  .score_info .highlight {
    color: #F90;
  }

  /*地址*/
  .item_site_info {
    margin-top: 4px;
    height: 15px;
  }

  .item_site_info > * {
    float: left;
    margin-right: 10px;
  }

  .item_site_info span {
    vertical-align: middle;
  }

  .item_site_map {
    color: pink;
  }

  .ellipsis > * {
    display: block;
    max-width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  /*价格*/
  .item_price_info {
    margin-top: 7px;
    color: #f60;
  }

  /*	路线推荐	 */
  .card_desc_bottom {
    float: left;
    clear: both;
    border-top: 1px dashed #E5E5E5;
    width: 400px;
  }

  .card_desc_bottom .abstract_list {
    position: relative;
    padding-top: 11px;
    float: left;
    width: 100%;
  }

  .abstract_box:first-child {
    margin-top: 0;
  }

  .abstract_box {
    overflow: hidden;
    margin-top: 6px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .abstract_box .abstract_icon {
    margin-top: 10px;
  }

  .abstract_box img {
    display: inline;
    width: auto;
    max-height: 15px;
    vertical-align: sub;
  }

  .abstract_box .abstract_message {
    line-height: 15px;
  }
</style>
