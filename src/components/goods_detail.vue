<template>
  <div class="main" v-loading='goodDetailLoading'>
    <div class="detail_intro">
      <!-- 商品名称 -->
      <div class="roduct_name">
        <span>{{goodDetail.resultGoods?goodDetail.resultGoods.goods.goodsTitle:''}}</span>
        <h1>{{goodDetail.resultGoods?goodDetail.resultGoods.goods.goodsCategory:''}}</h1>
        <p>{{goodDetail.resultGoods?goodDetail.resultGoods.goods.goodsTitle:''}}</p>
      </div>
      <div class="product_bottom">
        <!-- 商品图片 -->
        <div class="roduct_left">
          <img v-lazy="goodDetail.resultGoods?goodDetail.resultGoods.goodsImage.imageUrl:''">
        </div>
        <!-- 右边商品部分 -->
        <div class="roduct_info">
          <!-- 商品价格和销量 -->
          <div class="cl">
            <div class="roduct_price cl">
              <span class="price"><em>¥</em>{{goodDetail.resultGoods?goodDetail.resultGoods.goods.discountPrice:''}}</span>
              <span class="money">¥<del>{{goodDetail.resultGoods?goodDetail.resultGoods.goods.oringinalPrice:''}}</del></span>
            </div>

            <div class="roduct_stars">
              <span>已售<strong>{{goodDetail.resultGoods?goodDetail.resultGoods.goodsDetail.salesVolumn:''}}</strong></span>
            </div>
          </div>

          <!-- 商品信息 -->
          <div class="roduct_otherinfo roduct_linetop">
            <span class="otherinfo_title">上架时间</span>
            <div class="otherinfo_content">
              <span class="text">{{goodDetail.resultGoods?goodDetail.resultGoods.goodsDetail.creatGoodsTime:''}}</span>
            </div>
          </div>

          <div class="roduct_otherinfo roduct_linebom">
            <span class="otherinfo_title">服务</span>
            <div class="otherinfo_content">
              <em class="serving" title="支持“未消费，随时退款”">
                <i class="suishi"></i>
                <a @click.prevent href="javascript:;" target="_blank">随时退</a>
              </em>
              <em class="serving" title="支持 “过期未消费，一键退款”">
                <i class="guoqi"></i>
                <a @click.prevent href="javascript:;" target="_blank">过期退</a>
              </em>
            </div>
          </div>

          <!-- 商品套餐选择 -->
          <!-- <div class="roduct_otherinfo">
            <span class="otherinfo_title">套餐</span>
            <div class="otherinfo_module cl newga ga" p="套餐切换">
              <a @click.prevent class="current" href="javascript:;"><span>华美食品单黄白莲蓉铁盒<em>¥</em>72</span><i></i></a>
              <a @click.prevent href="javascript:;"><span>华美食品七星伴月月饼1盒<em>¥</em>108</span><i></i></a>
              <a @click.prevent href="javascript:;"><span>华美食品花团锦簇月饼1盒<em>¥</em>69</span><i></i></a>
              <a @click.prevent href="javascript:;"><span>华美食品冰皮月饼榴芒冰皮<em>¥</em>98</span><i></i></a>
              <a @click.prevent href="javascript:;"><span>华美食品吉祥福贵月饼礼盒<em>¥</em>98</span><i></i></a>
              <a @click.prevent href="javascript:;"><span>华美食品时尚双黄月饼1盒<em>¥</em>85</span><i></i></a>
              <a @click.prevent href="http://shenzhen.lashou.com/deal/14365498.html"><span>华美食品华美蛋黄酥1盒<em>¥</em>88</span><i></i></a>
            </div>
          </div> -->

          <!-- 商品数量 -->
          <div class="roduct_otherinfo  goods_num">
            <span class="otherinfo_title">数量</span>
            <div class="otherinfo_content">
              <span style="text-align:center;" class="minus disabled" v-on:click="minus">-</span>
              <input type="text" v-bind:value="goods_num" autocomplete="off" name="amount" class="buyin amount"
                     price="72" goods_id="13993308" min_per_user="1" max_per_user="30"
                     style="_webkit_user_select: all;">
              <span style="text-align:center;" class="plus" v-on:click="add">+</span>
            </div>
          </div>
          <!-- 按钮 -->
          <div class="roduct_button" v-if="!end">
            <div v-if="goodDetail.isOnSecKill" style="padding:10px;">抢购结束时间 : {{goodDetail.secKill.tgwSeckill.seckillEnd}}</div>
            <a v-if="!goodDetail.isOnSecKill" @click.stop.prevent="buy" class="button_red" href="javascript:;">立即购买</a>
            <a v-if="goodDetail.isOnSecKill" @click.stop.prevent="buyNow" class="button_red" href="javascript:;">马上抢购</a>
            <a @click.stop.prevent="addCar" class="button_cart button_cart_add"><i></i><span>买一个</span></a>
          </div>
          <div class="roduct_button end" v-if="end">
            <a @click.prevent class="button-gray" href="javascript:void(0)">已结束</a>
          </div>
        </div>
      </div>
    </div>
    <div
    v-html="goodDetail.resultGoods?goodDetail.resultGoods.goodsDetail.goodsDesc : '暂无描述'"
     class="my-comment" 
     style="background-color:white;text-align:center;padding:50px;">
    </div>
  </div>

</template>

<script>
import { mapMutations,mapGetters } from "vuex";
import { get, post } from "../util";
export default {
  data() {
    return {
      end: false,
      goods_num: 1,
      goodDetail: {},
      goodDetailLoading: false,
    };
  },
  created() {
    this.getGoodDetail();
  },
  activated() {
    this.getGoodDetail();
  },
  computed:{
...mapGetters(['userInfo'])
  },
  methods: {
    ...mapMutations(["setOrderDetail",'setOrderPayDetail']),
    async buyNow() {
      if(!this.userInfo.id){
        this.$message.warning('请先登录')
        return
      }
      try {
        const formDate = new FormData();
        formDate.append("goodsId", this.goodDetail.resultGoods.goods.id);
        formDate.append("count", this["goods_num"]);
        const result = await post("/tjsanshao/order/create", formDate);
        if (result.status == "success") {
          this.setOrderPayDetail(result);
          this.$router.push({
            name: "orderPay"
          });
        } else {
          this.$message.error("抢购失败");
        }
      } catch (error) {
        this.$message.error("服务器或者网络出现问题");
      }
    },
    add() {
      if(this.goodDetail.isOnSecKill){
        return
      }
      this.goods_num++;
    },
    minus() {
      if(this.goodDetail.isOnSecKill){
        return
      }
      this.goods_num == 1 ? 1 : this.goods_num--;
    },
    buy() {
      if(!this.userInfo.id){
        this.$message.warning('请先登录')
        return
      }
      this.setOrderDetail({
        goodsId: this.goodDetail.resultGoods.goods.id,
        name: this.goodDetail.resultGoods.goods.goodsTitle,
        count: this["goods_num"],
        single_price: this.goodDetail.resultGoods.goods.discountPrice,
        total:
          this["goods_num"] * this.goodDetail.resultGoods.goods.discountPrice
      });
      this.$router.push({ name: "order" });
    },
    async addCar() {
      if(!this.userInfo.id){
        this.$message.warning('请先登录')
        return
      }
      try {
        const formDate = new FormData();
        formDate.append("goodsId", this.goodDetail.resultGoods.goods.id);
        formDate.append("count", this["goods_num"]);
        const result = await post("/tjsanshao/order/create", formDate);
        if (result.status == "success") {
          this.$message.success("添加商品成功");
        } else {
          this.$message.error("添加商品失败");
        }
      } catch (error) {
        this.$message.error("服务器或者网络出现问题");
      }
    },
    async getGoodDetail() {
      try {
        this.goodDetailLoading = true;
        const result = await get("/xiaojian/goodsById", {
          id: this.$route.params.id
        });
        if (result.status == "success") {
          this.goodDetail = result;
        } else {
          this.$message.error("获取商品详情信息失败");
        }
      } catch (error) {
        this.$message.error("服务器或者网络出现问题");
      } finally {
        this.goodDetailLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.product_bottom {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.main {
  /* width: 1200px;
        min-width: 1200px; */
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.detail_intro {
  padding: 20px 25px 25px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  overflow: hidden;
}

.detail_intro a {
  text-decoration: none;
}

/*商品标题*/
.roduct_name {
  font-family: Microsoft Yahei;
  padding-bottom: 25px;
}

.roduct_name span {
  margin-left: -0.5em;
  font-size: 26px;
  line-height: 36px;
  color: #3d3d3d;
}

.roduct_name h1 {
  display: inline;
  font-size: 26px;
  line-height: 36px;
  color: #3d3d3d;
  font-weight: 400;
}

.roduct_name p {
  font-size: 16px;
  line-height: 24px;
  padding-top: 3px;
}

/*左侧商品图片*/
.roduct_left {
  width: 440px;
  height: 280px;
  position: relative;
}

.roduct_left img {
  border: 0;
  vertical-align: top;
  width: 440px;
  height: 280px;
}

/*右侧商品信息*/
.roduct_info {
  width: 678px;
  position: relative;
}

/*价格部分*/
.roduct_price {
  overflow: hidden;
  font-family: arial;
  margin-bottom: 10px;
  font-family: arial;
}

.roduct_price span.price {
  display: inline-block;
  font-size: 40px;
  line-height: 40px;
  color: #f67208;
  padding-right: 15px;
  float: left;
  vertical-align: top;
}

.roduct_price span.price em {
  display: inline-block;
  font-size: 28px;
  line-height: 30px;
  vertical-align: top;
  padding: 8px 8px 0 0;
  font-style: normal;
}

.roduct_price span.money {
  display: inline-block;
  height: 18px;
  font-size: 14px;
  line-height: 18px;
  padding: 18px 20px 0 0;
  vertical-align: top;
  float: left;
}

.roduct_price span.money del {
  margin-left: 2px;
}

/*销售情况*/
.roduct_stars {
  height: 20px;
  margin-top: 15px;
  padding-bottom: 18px;
  font-size: 14px;
  line-height: 20px;
  font-family: Microsoft Yahei;
}

.roduct_stars span {
  display: inline-block;
  float: left;
}

.roduct_stars strong {
  color: #ec361e;
  padding-left: 5px;
  font-family: arial;
}

/*有效期*/
.roduct_linetop {
  padding-top: 14px;
  border-top: 1px solid #ebebeb;
  height: 28px;
}

.roduct_otherinfo {
  font: 12px/1.5em tahoma, arial;
  padding: 2px 0 0 65px;
}

.otherinfo_title {
  display: inline-block;
  width: 65px;
  height: 28px;
  margin-left: -65px;
  line-height: 28px;
  color: #b0b0b0;
  float: left;
}

.otherinfo_content .text {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  padding-right: 20px;
  float: left;
}

/*服务*/
.roduct_linebom {
  padding-bottom: 12px;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 12px;
  height: 20px;
}

.otherinfo_content .serving {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 5px 30px 5px 0;
  float: left;
  white-space: nowrap;
  font-style: normal;
}

.serving i {
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 0;
  float: left;
  margin-right: 5px;
}

.serving a {
  color: #565656;
}

/*套餐选择*/
.otherinfo_module {
  overflow: hidden;
  margin-bottom: 10px;
}

.otherinfo_module a.current {
  border-color: #ff7e00;
}

.otherinfo_module a {
  display: inline-block;
  height: 26px;
  border: 1px solid #fff;
  float: left;
  margin: 0 5px 5px 0;
  color: #565656;
  position: relative;
  z-index: 1;
}

.otherinfo_module a span {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  border: 1px solid #e2e2e2;
  padding: 0 7px;
  white-space: nowrap;
}

.otherinfo_module em {
  padding: 0 2px 0 8px;
  font-family: arial;
  font-style: normal;
}

/*商品数量选择*/
.goods_num {
  height: 26px;
}

.otherinfo_content span.minus,
.otherinfo_content span.plus {
  display: inline-block;
  width: 26px;
  height: 26px;
  border: 1px solid #e2e2e2;
  background-color: #f6f6f6;
  float: left;
  cursor: pointer;
}

.otherinfo_content i.minus_icon,
.otherinfo_content i.plus {
  display: inline-block;
  width: 12px;
  height: 12px;
  font-size: 0;
  line-height: 0;
  overflow: hidden;
  margin: 7px;
}

.otherinfo_content input {
  width: 36px;
  height: 18px;
  padding: 4px 5px;
  line-height: 18px;
  border-width: 1px 0;
  border-style: solid;
  border-color: #e2e2e2;
  float: left;
  text-align: center;
  color: #565656;
  font-size: 100%;
  outline: 0;
  margin: 0;
}

/*按钮*/
.roduct_button {
  margin-top: 24px;
  height: 44px;
  font-family: Microsoft Yahei;
}

.button_red {
  background-color: #ff7e00;
  color: #fff;
  font-size: 18px;
  margin-right: 15px;
  box-shadow: 0 1px 0 #eb5e00;
}

.button_cart {
  background-color: #efefef;
  font-size: 14px;
  color: #565656;
  box-shadow: 0 1px 0 #dedede;
  cursor: pointer;
}

.button_gray {
  background-color: #f5f5f5;
  color: #acacac;
  font-size: 18px;
  margin-right: 15px;
  box-shadow: 0 1px 0 #eaeaea;
}

.button_red,
.button_cart,
.button_gray {
  display: inline-block;
  width: 160px;
  height: 44px;
  line-height: 44px;
  letter-spacing: 1px;
  text-align: center;
  float: left;
}

.my-comment {
      width: 100%;
      margin-top: 10px;
      border: 1px solid #cccccc;}
</style>
