<template>
  <div class="w-full h-7 mt-2 border-b-2 border-gray-300">
    <div class="mx-0 sm:mx-10">
      <div class="flex justify-between items-center px-6">
        <div class="justify-end items-center mr-2 hidden sm:flex">
          <div class="">
            <a href="#" class="flex items-center">
              <span class="mr-2">
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0H5.81818C4.85376 0 3.92883 0.383116 3.24688 1.06507C2.56493 1.74702 2.18182 2.67194 2.18182 3.63636V5.81818H0V8.72727H2.18182V14.5455H5.09091V8.72727H7.27273L8 5.81818H5.09091V3.63636C5.09091 3.44348 5.16753 3.25849 5.30392 3.1221C5.44031 2.98571 5.6253 2.90909 5.81818 2.90909H8V0Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              7500k Followers</a
            >
          </div>
          <div class="">
            <a href="tel:402-763-282-46" class="flex items-center">
              <span class="mr-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.359 2.73916C1.59079 2.35465 2.86862 0.958795 3.7792 1.00093C4.05162 1.02426 4.29244 1.1883 4.4881 1.37943H4.48885C4.93737 1.81888 6.22423 3.47735 6.29648 3.8265C6.47483 4.68282 5.45362 5.17645 5.76593 6.03954C6.56213 7.98771 7.93402 9.35948 9.88313 10.1549C10.7455 10.4679 11.2392 9.44752 12.0956 9.62511C12.4448 9.6981 14.1042 10.9841 14.5429 11.4333V11.4333C14.7333 11.6282 14.8989 11.8698 14.9214 12.1422C14.9553 13.1016 13.4728 14.3966 13.1838 14.5621C12.502 15.0505 11.6125 15.0415 10.5281 14.5373C7.50206 13.2784 2.66618 8.53401 1.38384 5.39391C0.893174 4.31561 0.860062 3.42016 1.359 2.73916Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9.84082 1.18318C12.5534 1.48434 14.6952 3.62393 15 6.3358"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9.84082 3.77927C11.1378 4.03207 12.1511 5.04544 12.4039 6.34239"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path></svg
              ></span>
              +(402) 763 282 46</a
            >
          </div>
        </div>
        <div class="flex justify-end items-center">
          <div class="flex item-center justify-between">
            <div class="mr-7 cursor-pointer">
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  English
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.alipay.com/"
                      >
                        English
                      </a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.taobao.com/"
                      >
                        Amharic
                      </a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>

            <div class="mr-7 cursor-pointer">
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  Setting
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.alipay.com/"
                      >
                        English
                      </a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://www.taobao.com/"
                      >
                        Amharic
                      </a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DownOutlined } from "@ant-design/icons-vue";

export default {
  name: "AddressComponent",
  components: {
    DownOutlined,
  },
};
</script>
