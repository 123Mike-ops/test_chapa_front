<template>
  <div class="container flex bg-white flex-col">
    <div
      class="w-full flex justify-between items-center h-16 px-5 py-2 shadow-md mb-4"
    >
      <div class="text-xl sm:text-2xl">{{ $t("profile.notification") }}</div>
      <div class="flex items-center justify-between">
        <button
          :class="`mr-2 px-3 py-2 hover:bg-custom_green-100 rounded-lg `"
          key="6"
          @click="changeKey(6)"
        >
          Mark all Read
        </button>
      </div>
    </div>
    <div>
      <NotificationCard
        v-for="notification in notifications"
        :notification="notification"
        :key="notification.id"
      />
    </div>
  </div>
</template>
v
<script>
import NotificationCard from "../../../components/profile/notification-card.vue";

export default {
  name: "NotificationPage",
  components: {
    NotificationCard,
  },
  data() {
    return {
      selected: 1,
      notifications: [
        {
          id: 1,
          title: "New Samsung Galaxy S9 Plus 64 GB Gray",
          create_time: "yessterday, 2:45",
          img: "https://img.freepik.com/free-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1699833600&semt=sph",
        },
        {
          id: 1,
          title: "New Laptop HP EliteBook 840 16GB Intel Core I5 SSD 512GB",
          create_time: "yessterday, 5:45",
          img: "data:image/jpeg;base64,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",
        },
        {
          id: 1,
          title: "T Shirt Fetil and Afework",
          create_time: "yessterday, 1:45",
          img: "data:image/jpeg;base64,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",
        },
      ],
    };
  },
  methods: {
    changeKey(key) {
      this.selected = key;
    },
  },
};
</script>
<style scoped>
.ant-tabs {
  width: 100%;
}

.ant-tabs-nav-wrap::before {
  height: 100px !important;
  padding: 10px 0;
}
::v-deep .ant-tabs-nav-wrap {
  padding: 8px 0px;
  width: 100% !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
::v-deep .ant-tabs-tab {
  margin-right: 3px !important;
  border: none !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
::v-deep .ant-tabs-tab-active {
  color: green;
  font-weight: bold;
}
</style>
