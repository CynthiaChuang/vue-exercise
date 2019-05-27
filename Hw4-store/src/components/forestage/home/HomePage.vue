<template>
  <div>
    <div class="container">
      <Navbar
        :menus="navbarMenus"/>

      <BannerSwiper
        class="pb-4 pt-1"
        :banners="banners"
        :swiperOption="swiperOption"/>

    </div>

    <main role="main" class="container">

      <Showcase v-for="(display, idx) in showcases" :key="idx"
                :title="display.title"
                :showpieces="display.showpieces"/>


      <Temp/>
    </main>
  </div>
</template>

<script>

  import routerUtil from "@/utils/RouterUtil.js"

  import Navbar from "./Navbar.vue"
  import BannerSwiper from "./BannerSwiper.vue"

  import BasePage from "@/components/common/BasePage.vue"
  import Showcase from "@/components/forestage/home/Showcase.vue"

  import Temp from "@/components/forestage/home/Temp.vue"

  export default {
    name: 'HomePage',
    extends: BasePage,
    components: {
      Navbar,
      BannerSwiper,
      Showcase,
      Temp,
    },
    data: () => ({
      banners: [],
      navbarMenus: [],
      showcases: [],
    }),
    created() {
      this.initNavbarMenus();
      this.initBanners();
      this.initShowcases();
    },
    methods: {
      initNavbarMenus() {
        this.navbarMenus = [...this.$store.getters["getClNameAndRouter"],
          {
            name: this.$t("home.backstage"),
            action: () => {
              routerUtil.gotoManagerPage(this.$router)
            }
          }];
      },
      initBanners() {
        this.banners = this.$store.getters["getBanners"];
      },
      initShowcases() {
        this.showcases = [
          {
            title: this.$t('home.tab.recommend'),
            showpieces: [{
              category: "書寫用品",
              content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
              description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
              id: "-LfTT_QlnJN7IjRuyy_N",
              imageUrl:
                "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
              inventory: "10",
              is_enabled: true,
              num: 2,
              origin_price: "1880",
              price: "1680",
              title: "TIJ 鈦極筆經典款",
              unit: "隻"
            },
              {
                category: "書寫用品",
                content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                  "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                  "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                  "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                  "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                  "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
                description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
                id: "-LfTT_QlnJN7IjRuyy_N",
                imageUrl:
                  "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                inventory: "10",
                is_enabled: true,
                num: 2,
                origin_price: "1880",
                price: "1680",
                title: "TIJ 鈦極筆經典款",
                unit: "隻"
              },
              {
                category: "書寫用品",
                content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                  "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                  "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                  "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                  "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                  "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
                description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
                id: "-LfTT_QlnJN7IjRuyy_N",
                imageUrl:
                  "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                inventory: "10",
                is_enabled: true,
                num: 2,
                origin_price: "1880",
                price: "1680",
                title: "TIJ 鈦極筆經典款",
                unit: "隻"
              },
              {
                category: "書寫用品",
                content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                  "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                  "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                  "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                  "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                  "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
                description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
                id: "-LfTT_QlnJN7IjRuyy_N",
                imageUrl:
                  "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                inventory: "10",
                is_enabled: true,
                num: 2,
                origin_price: "1880",
                price: "1680",
                title: "TIJ 鈦極筆經典款",
                unit: "隻"
              },
              {
                category: "書寫用品",
                content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                  "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                  "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                  "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                  "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                  "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
                description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
                id: "-LfTT_QlnJN7IjRuyy_N",
                imageUrl:
                  "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                inventory: "10",
                is_enabled: true,
                num: 2,
                origin_price: "1880",
                price: "1680",
                title: "TIJ 鈦極筆經典款",
                unit: "隻"
              },
              {
                category: "書寫用品",
                content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                  "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                  "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                  "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                  "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                  "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
                description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
                id: "-LfTT_QlnJN7IjRuyy_N",
                imageUrl:
                  "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                inventory: "10",
                is_enabled: true,
                num: 2,
                origin_price: "1880",
                price: "1680",
                title: "TIJ 鈦極筆經典款",
                unit: "隻"
              }]
          },
          {
            title: this.$t('home.tab.recently'),
            showpieces: [{
              category: "書寫用品",
              content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
              description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
              id: "-LfTT_QlnJN7IjRuyy_N",
              imageUrl:
                "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
              inventory: "10",
              is_enabled: true,
              num: 2,
              origin_price: "1880",
              price: "1680",
              title: "TIJ 鈦極筆經典款",
              unit: "隻"
            },
              {
                category: "書寫用品",
                content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                  "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                  "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                  "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                  "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                  "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
                description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
                id: "-LfTT_QlnJN7IjRuyy_N",
                imageUrl:
                  "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                inventory: "10",
                is_enabled: true,
                num: 2,
                origin_price: "1880",
                price: "1680",
                title: "TIJ 鈦極筆經典款",
                unit: "隻"
              },
              {
                category: "書寫用品",
                content: "鈦極筆主要特色↵1. 擺脫筆芯的束縛：簡單的透過更換筆芯的方式變為自動鉛筆、原子筆或中性筆" +
                  "，可將最喜愛的筆芯裝入使用。↵2.  支援逾百種筆芯：可使用百樂、三菱、萬寶龍、派克、MUJI、SCHMIDT" +
                  "...等超過百種市售筆芯，甚至未來新的筆芯只要尺寸符合也可使用，是世界上第一支可使用數百種筆芯的自動" +
                  "筆。↵3. 前後夾固定筆芯：讓所有筆芯都緊密貼合筆嘴，寫起字來享受前所未有的精準感受。↵4. 全零件鈦合金" +
                  "製：可以不用照顧永久保存，長時間使用後內外部不會有銅綠、鐵鏽造成皮膚過敏。↵5. 零件皆一體成形：捨" +
                  "棄擠壓式工法，接合處使用螺紋對鎖或物理卡榫固定，堅固耐用。↵",
                description: "搭載四季織墨水的簽字筆，一頭為毛筆頭另一筆為極細簽字筆，不用購買鋼筆及墨水即可畫出四季織的墨色！",
                id: "-LfTT_QlnJN7IjRuyy_N",
                imageUrl:
                  "https://images.unsplash.com/photo-1509824189536-24ab5d1ecb00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                inventory: "10",
                is_enabled: true,
                num: 2,
                origin_price: "1880",
                price: "1680",
                title: "TIJ 鈦極筆經典款",
                unit: "隻"
              }]
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

  .display-4 {
    font-size: 2.5rem;
  }

  @media (min-width: 768px) {
    .display-4 {
      font-size: 3rem;
    }
  }
</style>
