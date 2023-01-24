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
import complete from "../views/bakery/production/complete/complete.vue";
import newInvoice from "../views/invoice/new/newInvoice.vue";
import draftInvoice from "../views/invoice/draftInvoice/draftInvoice.vue";
import completedInvoice from "../views/invoice/completedInvoice/completedInvoice.vue";
import showInvoice from "../views/invoice/show/showInvoice.vue";
import newpayment from "../views/payment/new/newpayment.vue";
import listpaymentbymethod from "../views/payment/listpaymentbymethod/listpaymentbymethod.vue";
import listpayment from "../views/payment/list/listpayment.vue";
import dailyinvoicereport from "../views/invoice/dailyinvoicereport/dailyinvoicereport.vue";
import weeklyinvoicereport from "../views/invoice/weeklyinvoicereport/weeklyinvoicereport.vue";
import montlyinvoicereport from "../views/invoice/montlyinvoicereport/montlyinvoicereport.vue";
import montlyinvoicereportbycustomer from "../views/invoice/montlyinvoicereportbycustomer/montlyinvoicereportbycustomer.vue";
import dailypaymentreport from "../views/payment/dailypaymentreport/dailypaymentreport.vue";
import weeklypaymentreport from "../views/payment/weeklypaymentreport/weeklypaymentreport.vue";
import montlypaymentreport from "../views/payment/montlypaymentreport/montlypaymentreport.vue";
import montlypaymentreportbycustomer from "../views/payment/montlypaymentreportbycustomer/montlypaymentreportbycustomer.vue";
import group from "../views/accesscontrol/group/listgroup/group.vue"
import user from "../views/accesscontrol/user/listuser/listuser.vue"
import montlyinvoicereportbyuser from "../views/invoice/montlyinvoicereportbyuser/montlyinvoicereportbyuser.vue";
import balancesheet from "../views/customermanager/balancesheet/balancesheet.vue";
import customercreditpayment from "../views/customermanager/creditpayment/customercreditpayment.vue";
import dailypurchasereport from "../views/bakery/purchase/dailypurchasereport/dailypurchasereport.vue";
import weeklypurchasereport from "../views/bakery/purchase/weeklypurchasereport/weeklypurchasereport.vue";
import monthlypurchasereport from "../views/bakery/purchase/monthlypurchasereport/monthlypurchasereport.vue";
import monthlypurchasereportbysupplier
  from "../views/bakery/purchase/monthlypurchasereportbysupplier/monthlypurchasereportbysupplier.vue";
import monthlypurchasereportbyuser
  from "../views/bakery/purchase/monthlypurchasereportbyuser/monthlypurchasereportbyuser.vue";
import dailyproductionreport from "../views/bakery/production/dailyproductionreport/dailyproductionreport.vue";
import weeklyproductionreport from "../views/bakery/production/weeklyproductionreport/weeklyproductionreport.vue";
import monthlyproductionreport from "../views/bakery/production/monthlyproductionreport/monthlyproductionreport.vue";
import monthlyproductionreportbyuser
  from "../views/bakery/production/monthlyproductionreportbyuser/monthlyproductionreportbyuser.vue";


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
    path: '/access-control',
    name: "AccessControl",
    modulename:"Access Control",
    component: AppLayout,
    children: [
      {
        path : "groups",
        name : "groups.list",
        title : "List User Groups",
        component : group
      },
      {
        path : "newgroups",
        name : "groups.new",
        title : "Create User Group",
        component : group
      },
      {
        path : "editgroups",
        name : "groups.edit",
        title : "Edit User Group",
        component : group
      },
      {
        path : "togglegroups",
        name : "groups.toggle",
        title : "Toggle Group",
        component : group
      },
      {
        path : "editpermissiongroups",
        name : "groups.edit.permission",
        title : "Edit Group Permission",
        component : group
      },
      {
        path : "users",
        name : "user.list",
        title : "List Users",
        component : user
      },
      {
        path : "newusers",
        name : "user.new",
        title : "Create New User",
        component : user
      },
      {
        path : "editusers",
        name : "user.edit",
        title : "Edit User",
        component : user
      },
      {
        path : "toggleuser",
        name : "user.toggle",
        title : "Toggle User",
        component : user
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name : "Settings",
    modulename:"System Settings",
    component : AppLayout,
    children : [
      {
        path : "store",
        name : "settings.store",
        title : "Store Settings",
        component : store
      },
      {
        path : "manufacturer",
        name : "settings.list.manufacturer",
        title : "List Manufacturers",
        component : manufacturer
      },
      {
        path : "newmanufacturer",
        name : "settings.create.manufacturer",
        title : "Create New Manufacturer",
        component : manufacturer
      },
      {
        path : "editmanufacturer",
        name : "settings.edit.manufacturer",
        title : "Edit Manufacturer",
        component : manufacturer
      },
      {
        path : "productcategory",
        name : "settings.productcategory",
        title : "List Product Category",
        component : category
      },
      {
        path : "newproductcategory",
        name : "settings.create.productcategory",
        title : "Create Product Category",
        component : category
      },
      {
        path : "editproductcategory",
        name : "settings.edit.productcategory",
        title : "Edit Product Category",
        component : category
      },
      {
        path : "expensestype",
        name : "settings.expensestype",
        title : "List Expenses Type",
        component : Expensestype
      },
      {
        path : "newexpensestype",
        name : "settings.create.expensestype",
        title : "Create Expenses Type",
        component : Expensestype
      },
      {
        path : "editexpensestype",
        name : "settings.edit.expensestype",
        title : "Edit Expenses Type",
        component : Expensestype
      },
      {
        path : "payment_method",
        name : "settings.payment_method",
        title : "List Payment Method",
        component : paymentmethod
      },
      {
        path : "newpayment_method",
        name : "settings.create.payment_method",
        title : "Create Payment Method",
        component : paymentmethod
      },
      {
        path : "editpayment_method",
        name : "settings.edit.payment_method",
        title : "Edit Payment Method",
        component : paymentmethod
      },
      {
        path : "suppliers",
        name : "settings.supplier",
        title : "List Suppliers",
        component : supplier
      },
      {
        path : "newsuppliers",
        name : "settings.create.supplier",
        title : "Create New Supplier",
        component : supplier
      },
      {
        path : "editsuppliers",
        name : "settings.edit.supplier",
        title : "Edit Supplier",
        component : supplier
      },
      {
        path : "banks",
        name : "settings.banks",
        title : "List Banks",
        component : bank
      },
      {
        path : "newbanks",
        name : "settings.create.banks",
        title : "Create New Bank",
        component : bank
      },
      {
        path : "editbanks",
        name : "settings.edit.banks",
        title : "Edit Bank",
        component : bank
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/bakeryManager',
    name : "BakeryManager",
    modulename:"Bakery Management",
    component : AppLayout,
    children : [
      {
        path : "rawmaterials",
        name : "bakeryManager.rawmaterialsManager",
        title : "List Raw Material",
        component : rawmaterial
      },
      {
        path : "newrawmaterials",
        name : "bakeryManager.new.rawmaterialsManager",
        title : "Create New Raw Material",
        component : rawmaterial
      },
      {
        path : "editrawmaterials",
        name : "bakeryManager.edit.rawmaterialsManager",
        title : "Edit Raw Material",
        component : rawmaterial
      },
      {
        path : "togglerawmaterials",
        name : "bakeryManager.toggle.rawmaterialsManager",
        title : "Toggle Raw Material",
        component : rawmaterial
      },
      {
        path : "rawmaterials/availability",
        name : "bakeryManager.available.rawmaterialsManager",
        title : "List Available Raw Material",
        component : available
      },
      {
        path : "purchase/list",
        name : "list-purchase-Material",
        title : "List Raw MaterialPurchase",
        component : listpurchase
      },
      {
        path : "purchase/add",
        name : "new-purchase-Material",
        title : "New Raw Material Purchase",
        component : newpurchase
      },
      {
        path : "purchase/:id/show",
        name : "show-purchase-Material",
        title : "View Raw Materials Purchase",
        props: true,
        component : showpurchase
      },
      {
        path : "purchase/:id/edit",
        name : "edit-purchase-Material",
        title : "Edit Raw Purchase Material",
        props: true,
        component : newpurchase
      },
      {
        path : "purchase/:id/complete",
        name : "complete-purchase-Material",
        title : "Complete Raw Purchase Material",
        props: true,
        component : newpurchase
      },
      {
        path : "purchase/report/daily",
        name : "purchase.report.daily",
        title : "Daily Purchase Report",
        props: true,
        component : dailypurchasereport
      },
      {
        path : "purchase/report/weekly",
        name : "purchase.report.weekly",
        title : "Weekly Purchase Report",
        props: true,
        component : weeklypurchasereport
      },
      {
        path : "purchase/report/monthly",
        name : "purchase.report.monthly",
        title : "Monthly Purchase Report",
        props: true,
        component : monthlypurchasereport
      },
      {
        path : "purchase/report/monthly/supplier",
        name : "purchase.report.supplier",
        title : "Purchase Report By Supplier",
        props: true,
        component : monthlypurchasereportbysupplier
      },
      {
        path : "purchase/report/monthly/user",
        name : "purchase.report.user",
        title : "Purchase Report By User",
        props: true,
        component : monthlypurchasereportbyuser
      },
      {
        path : "production/new",
        name : "newproduction",
        title : "Create New Production",
        component : newproduction
      },
      {
        path : "productions/list",
        name : "listproduction",
        title : "List Productions",
        component : listproduction
      },
      {
        path : "productions/:id/edit",
        name : "edit-productions",
        title : "Edit Production",
        props: true,
        component : newproduction
      },
      {
        path : "productions/:id/show",
        name : "show-productions",
        title : "View Production",
        props: true,
        component : showproduction
      },
      {
        path : "productions/:id/complete",
        name : "complete-productions",
        title : "Complete Production",
        props: true,
        component : complete
      },
      {
        path : "production/report/daily",
        name : "production.report.daily",
        title : "Daily Production Report",
        props: true,
        component : dailyproductionreport
      },
      {
        path : "production/report/weekly",
        name : "production.report.weekly",
        title : "Weekly Production Report",
        props: true,
        component : weeklyproductionreport
      },
      {
        path : "production/report/monthly",
        name : "production.report.monthly",
        title : "Monthly Production Report",
        props: true,
        component : monthlyproductionreport
      },
      {
        path : "production/report/monthly/user",
        name : "production.report.user.monthly",
        title : "Monthly Production Report By User",
        props: true,
        component : monthlyproductionreportbyuser
      },
      {
        path : "transfer/list",
        name : "list-transfer-Request",
        title : "List Material Transfer Requests",
        component : listtransfer
      },
      {
        path : "transfer/:id/show",
        name : "show-transfer",
        title : "Show Material Transfer Request",
        props: true,
        component : showtransfer
      },
      {
        path : "transfer/:id/approve",
        name : "approve-transfer",
        title : "Approve Material Transfer Request",
        props: true,
        component : showtransfer
      },

      {
        path : "transfer/:id/decline",
        name : "decline-transfer",
        title : "Decline Material Transfer Request",
        props: true,
        component : showtransfer
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/customerManager',
    name : "CustomerManager",
    modulename:"Customer Manager",
    component : AppLayout,
    children : [
      {
        path : "customers",
        name : "customer.list",
        title : "List Customers",
        component : customer
      },
      {
        path : "newcustomers",
        name : "customer.new",
        title : "Create Customer",
        component : customer
      },
      {
        path : "editcustomers",
        name : "customer.edit",
        title : "Edit Customer",
        component : customer
      },
      {
        path : "balancesheet",
        name : "customer.balancesheet",
        title : "Customer Balance Sheet",
        component : balancesheet
      },
      {
        path : "addcreditpayment",
        name : "customer.addcreditpayment",
        title : "Add Customer Credit Payment",
        component : customercreditpayment
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice',
    name : "InvoiceManager",
    modulename:"Invoice Management",
    component : AppLayout,
    children : [
      {
        path : "new",
        name : "invoice.new",
        title : "Create New Invoice",
        component : newInvoice
      },
      {
        path : "draft",
        name : "invoice.draft",
        title : "List Draft Invoice",
        props: true,
        component : draftInvoice
      },
      {
        path : "completed",
        name : "invoice.complete",
        title : "List Completed Invoice",
        props: true,
        component : completedInvoice
      },
      {
        path : ":id/show",
        name : "invoice.show",
        title : "View Invoice",
        props: true,
        component :showInvoice
      },
      {
        path : ":id/edit",
        name : "invoice.edit",
        title : "Edit Invoice",
        props: true,
        component : newInvoice
      },
      {
        path : "/printA4",
        name : "/printA4",
        title : "Print A4 Invoice",
        props: true,
        component : newInvoice
      },
      {
        path : "/printThermal",
        name : "/printThermal",
        title : "Print Thermal",
        props: true,
        component : newInvoice
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/payment',
    name : "PaymentManager",
    modulename:"Payment Management",
    component : AppLayout,
    children : [
      {
        path : "new",
        name : "payment.new",
        title : "New Invoice Payment",
        component : newpayment
      },
      {
        path : "listpayment",
        name : "payment.list",
        title : "List Invoice Payments",
        component : listpayment
      },
      {
        path : "listpaymentbymethod",
        name : "payment.list.paymentbymethod",
        title : "List Invoice Payment By Method",
        component : listpaymentbymethod
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/invoice/report',
    name : "InvoiceReport",
    modulename:"Invoice Report",
    component : AppLayout,
    children : [
      {
        path : "daily",
        name : "daily.invoice.report",
        title : "Daily Invoice report",
        component : dailyinvoicereport
      },
      {
        path : "weekly",
        name : "weekly.invoice.report",
        title : "Weekly Invoice report",
        component : weeklyinvoicereport
      },
      {
        path : "monthly",
        name : "monthly.invoice.report",
        title : "Monthly Invoice report",
        component : montlyinvoicereport
      },
      {
        path : "monthly/customer",
        name : "customer.monthly.invoice.report",
        title : "Customer Monthly Invoice report",
        component : montlyinvoicereportbycustomer
      },
      {
        path : "monthly/user",
        name : "user.monthly.invoice.report",
        title : "User Monthly Invoice report",
        component : montlyinvoicereportbyuser
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/payment/report',
    name : "PaymentReport",
    modulename:"Payment Report",
    component : AppLayout,
    children : [
      {
        path : "daily",
        name : "daily.payment.report",
        title : "Daily Payment Report",
        component : dailypaymentreport
      },
      {
        path : "weekly",
        name : "weekly.payment.report",
        title : "Weekly Payment Report",
        component : weeklypaymentreport
      },
      {
        path : "monthly",
        name : "monthly.payment.report",
        title : "Monthly Payment Report",
        component :montlypaymentreport
      },
      {
        path : "monthly/customer",
        name : "customer.monthly.payment.report",
        title : "Customer Monthly Payment Report",
        component : montlypaymentreportbycustomer
      },
      {
        path : "monthly/user",
        name : "user.monthly.payment.report",
        title : "User Monthly Payment Report",
        component : dailypaymentreport
      },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/stock',
    name : "StockManager",
    modulename:"Stock Management",
    component : AppLayout,
    children : [
      {
        path : "list",
        name : "stock.list",
        title : "List Stock",
        component : listStock
      },
      {
        path : "new",
        name : "stock.new",
        title : "Create New Stock",
        component : newStock
      },
      {
        path : "available",
        name : "stock.available",
        title : "List Available Stock",
        component : AvailableStock
      },
      {
        path : "disabled",
        name : "stock.disabled",
        title : "List Disabled Stock",
        component : disabledStock
      },
      {
        path : ":id/edit",
        name : "stock.edit",
        title : "Edit Stock",
        props: true,
        component : newStock
      },
      {
        path : ":id/toggle",
        name : "stock.toggle",
        title : "Toggle Stock",
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

