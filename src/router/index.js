import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "../stores/user";
import Auth from "../views/auth/auth.vue";
import AppLayout from "../layouts/app/app-layout.vue";
import Dashboard from "../views/dashboard/dashboard.vue";
import manufacturer from "../views/settings/manufacturer/manufacturer.vue";
import category from "../views/settings/category/category.vue";
import Expensestype from "../views/settings/expensestype/expensestype.vue";
import paymentmethod from "../views/settings/paymentmethod/paymentmethod.vue";
import supplier from "../views/settings/supplier/supplier.vue";
import bank from "../views/settings/bank/bank.vue";
import rawmaterial from "../views/bakery/material/rawmaterial/rawmaterial.vue";
import available from "../views/bakery/material/availablematerial/available.vue";
import listpurchase from "../views/bakery/purchase/list/listpurchase.vue";
import newpurchase from "../views/bakery/purchase/new/newpurchase.vue";
import showpurchase from "../views/bakery/purchase/show/showpurchase.vue";
import newproduction from "../views/bakery/production/new/newproduction.vue";
import customer from "../views/customermanager/customer/customer.vue";
import listStock from "../views/stock/list/listStock.vue";
import newStock from "../views/stock/new/newStock.vue";
import AvailableStock from "../views/stock/available/availableStock.vue";
import disabledStock from "../views/stock/disabled/disabledStock.vue";
import store from "../views/settings/store/store.vue";
import listproduction from "../views/bakery/production/list/listproduction.vue";
import showproduction from "../views/bakery/production/show/showproduction.vue";
import listtransfer from "../views/bakery/transfer/list/listtransfer.vue";
import showtransfer from "../views/bakery/transfer/show/showtransfer.vue";




const routes = [

  { path: '/', name: 'Login', component: Auth },

  {
    path: '/dashboard',
    name : "AppHome",
    component : AppLayout,
    children : [
      {
        path : "",
        name : "Dashboard",
        title : "Dashboard",
        component : Dashboard
      },

    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name : "Settings",
    component : AppLayout,
    children : [
      {
        path : "store",
        name : "Store",
        title : "Store Settings",
        component : store
      },
      {
        path : "manufacturer",
        name : "Manufacturer",
        title : "Manufacturer",
        component : manufacturer
      },
      {
        path : "productcategory",
        name : "productcategory",
        title : "Product Category",
        component : category
      },
      {
        path : "expensestype",
        name : "expensestype",
        title : "Expenses Type",
        component : Expensestype
      },
      {
        path : "payment_method",
        name : "payment_method",
        title : "Payment Method",
        component : paymentmethod
      },
      {
        path : "suppliers",
        name : "supplier",
        title : "Supplier",
        component : supplier
      },
      {
        path : "banks",
        name : "banks",
        title : "Bank",
        component : bank
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/bakeryManager',
    name : "BakeryManager",
    component : AppLayout,
    children : [
      {
        path : "rawmaterials",
        name : "rawmaterialsManager",
        title : "Raw Material Manager",
        component : rawmaterial
      },
      {
        path : "rawmaterials/availability",
        name : "rawmaterialsAvailability",
        title : "Available Raw Material",
        component : available
      },
      {
        path : "purchase/list",
        name : "list-purchase-Material",
        title : "List Purchase Material",
        component : listpurchase
      },
      {
        path : "purchase/add",
        name : "new-purchase-Material",
        title : "New Purchase Material",
        component : newpurchase
      },
      {
        path : "purchase/:id/show",
        name : "show-purchase-Material",
        title : "Show Purchase Material",
        props: true,
        component : showpurchase
      },
      {
        path : "purchase/:id/edit",
        name : "edit-purchase-Material",
        title : "Edit Purchase Material",
        props: true,
        component : newpurchase
      },
      {
        path : "production/new",
        name : "newproduction",
        title : "New Production",
        component : newproduction
      },
      {
        path : "productions/list",
        name : "listproduction",
        title : "List Production",
        component : listproduction
      },
      {
        path : "productions/:id/edit",
        name : "edit-productions",
        title : "Edit Productions",
        props: true,
        component : newproduction
      },
      {
        path : "productions/:id/show",
        name : "show-productions",
        title : "Show Productions",
        props: true,
        component : showproduction
      },
      {
        path : "productions/:id/complete",
        name : "complete-productions",
        title : "Complete Productions",
        props: true,
        component : showproduction
      },
      {
        path : "transfer/list",
        name : "list-transfer-Request",
        title : "List Transfer Request",
        component : listtransfer
      },
      {
        path : "transfer/:id/show",
        name : "show-transfer",
        title : "Show Transfer",
        props: true,
        component : showtransfer
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/customerManager',
    name : "CustomerManager",
    component : AppLayout,
    children : [
      {
        path : "customers",
        name : "customerManager",
        title : "Customer Manager",
        component : customer
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/stock',
    name : "StockManager",
    component : AppLayout,
    children : [
      {
        path : "list",
        name : "list-stock",
        title : "List Stock",
        component : listStock
      },
      {
        path : "new",
        name : "new-stock",
        title : "New Stock",
        component : newStock
      },
      {
        path : "available",
        name : "available-stock",
        title : "Available Stock",
        component : AvailableStock
      },
      {
        path : "disabled",
        name : "disabled-stock",
        title : "Disabled Stock",
        component : disabledStock
      },
      {
        path : ":id/edit",
        name : "edit-stock",
        title : "Edit Stock",
        props: true,
        component : newStock

      },

    ],
    meta: { requiresAuth: true }
  }


];


const router = new createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach((to, from) => {

  const user = useUserStore();

  if (to.meta.requiresAuth && !user.islogin()) {
    return {
      path: '/',
    }
  }
})

export default router;

