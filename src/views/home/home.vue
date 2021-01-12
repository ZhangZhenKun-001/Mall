<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommds-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :title="['流行','新款','精选']"/>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommdsView from './childComps/HomeRecommdsView.vue';
import FeatureView from './childComps/FeatureView.vue';

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from 'components/content/tabControl/TabControl.vue';

import { getHomeMultidata } from "network/home";

export default {
  name: "home",
  components: {
    HomeSwiper,
    HomeRecommdsView,
    FeatureView,
    NavBar,
    TabControl,
  },
  data(){
    return {
      banners:[],
      recommends:[],
    }
  },
  created(){
    // 请求多个数据
    getHomeMultidata().then(
      res => {
        // console.log(res);
        this.banners = res.data.banner.list,
        this.recommends = res.data.recommend.list
      }
    )
  }
};
</script>
 
<style>
#home{
  padding-top: 44px ;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9999;
}

.tab-control{
  position: sticky;
  top: 44px;
}
</style>