import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/workbench",
      children: [
        {
          path: "workbench",
          name: "Workbench",
          component: () => import("../views/Workbench/index.vue"),
          meta: { title: "工作台", icon: "Grid" },
        },
        {
          path: "orders",
          name: "Orders",
          redirect: "/orders/data",
          component: () => import("../views/Orders/index.vue"),
          meta: { title: "订单管理", icon: "Document" },
          children: [
            {
              path: "data",
              name: "OrdersData",
              component: () => import("../views/Orders/Data/index.vue"),
              meta: { title: "订单数据", icon: "Document" },
            },
            {
              path: "create",
              name: "OrdersCreate",
              component: () => import("../views/Orders/Create/index.vue"),
              meta: { title: "创建订单", icon: "Document" },
            },
            {
              path: "transfer",
              name: "OrdersTransfer",
              component: () => import("../views/Orders/Transfer/index.vue"),
              meta: { title: "订单调度", icon: "Document" },
            },
            {
              path: "smart",
              name: "OrdersSmart",
              component: () => import("../views/Orders/Smart/index.vue"),
              meta: { title: "智能合单", icon: "Document" },
            },
          ],
        },
        {
          path: "operations",
          name: "Operations",
          redirect: "/operations/waybill",
          component: () => import("../views/Operations/index.vue"),
          meta: { title: "运营管理", icon: "Location" },
          children: [
            {
              path: "waybill",
              name: "OperationsWaybill",
              component: () => import("../views/Operations/Waybill/index.vue"),
              meta: { title: "运单管理", icon: "Document" },
            },
            {
              path: "cargo",
              name: "OperationsCargo",
              component: () => import("../views/Operations/Cargo/index.vue"),
              meta: { title: "提货单管理", icon: "Document" },
            },
            {
              path: "payment",
              name: "OperationsPayment",
              component: () => import("../views/Operations/Payment/index.vue"),
              meta: { title: "签收单管理", icon: "Document" },
            },
          ],
        },
        {
          path: "transport",
          name: "Transport",
          redirect: "/transport/vehicle",
          component: () => import("../views/Transport/index.vue"),
          meta: { title: "运输监控", icon: "Location" },
          children: [
            {
              path: "vehicle",
              name: "TransportVehicle",
              component: () => import("../views/Transport/Vehicle/index.vue"),
              meta: { title: "车辆轨迹", icon: "Location" },
            },
            {
              path: "plan",
              name: "TransportPlan",
              component: () => import("../views/Transport/Plan/index.vue"),
              meta: { title: "运输计划", icon: "Document" },
            },
            {
              path: "exception",
              name: "TransportException",
              component: () => import("../views/Transport/Exception/index.vue"),
              meta: { title: "异常订单", icon: "Warning" },
            },
          ],
        },
        {
          path: "resources",
          name: "Resources",
          redirect: "/resources/vehicle",
          component: () => import("../views/Resources/index.vue"),
          meta: { title: "资料管理", icon: "Document" },
          children: [
            {
              path: "vehicle",
              name: "ResourcesVehicle",
              component: () => import("../views/Resources/Vehicle/index.vue"),
              meta: { title: "车辆管理", icon: "Document" },
            },
            {
              path: "team",
              name: "ResourcesTeam",
              component: () => import("../views/Resources/Team/index.vue"),
              meta: { title: "车队管理", icon: "Document" },
            },
            {
              path: "driver",
              name: "ResourcesDriver",
              component: () => import("../views/Resources/Driver/index.vue"),
              meta: { title: "司机管理", icon: "User" },
            },
            {
              path: "customer",
              name: "ResourcesCustomer",
              component: () => import("../views/Resources/Customer/index.vue"),
              meta: { title: "客户管理", icon: "User" },
            },
          ],
        },
        {
          path: "finance",
          name: "Finance",
          redirect: "/finance/receipt",
          component: () => import("../views/Finance/index.vue"),
          meta: { title: "财务管理", icon: "Document" },
          children: [
            {
              path: "receipt",
              name: "FinanceReceipt",
              component: () => import("../views/Finance/Receipt/index.vue"),
              meta: { title: "收款单管理", icon: "Document" },
            },
            {
              path: "cost",
              name: "FinanceCost",
              component: () => import("../views/Finance/Cost/index.vue"),
              meta: { title: "货运成本", icon: "Document" },
            },
          ],
        },
        {
          path: "settings",
          name: "Settings",
          redirect: "/settings/company",
          component: () => import("../views/Settings/index.vue"),
          meta: { title: "系统设置", icon: "Setting" },
          children: [
            {
              path: "company",
              name: "SettingsCompany",
              component: () => import("../views/Settings/Company/index.vue"),
              meta: { title: "企业设置", icon: "Setting" },
            },
            {
              path: "department",
              name: "SettingsDepartment",
              component: () => import("../views/Settings/Department/index.vue"),
              meta: { title: "部门管理", icon: "Setting" },
            },
            {
              path: "employee",
              name: "SettingsEmployee",
              component: () => import("../views/Settings/Employee/index.vue"),
              meta: { title: "员工管理", icon: "User" },
            },
            {
              path: "role",
              name: "SettingsRole",
              component: () => import("../views/Settings/Role/index.vue"),
              meta: { title: "角色管理", icon: "Setting" },
            },
            {
              path: "profile",
              name: "SettingsProfile",
              component: () => import("../views/Settings/Profile/index.vue"),
              meta: { title: "个人信息", icon: "User" },
            },
            {
              path: "notification",
              name: "SettingsNotification",
              component: () =>
                import("../views/Settings/Notification/index.vue"),
              meta: { title: "消息通知", icon: "Bell" },
            },
            {
              path: "log",
              name: "SettingsLog",
              component: () => import("../views/Settings/Log/index.vue"),
              meta: { title: "操作日志", icon: "Document" },
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;

