import Vue from "vue";
import tools from "@/utils/tools";
Vue.filter("htmlToText", (html: string) => {
  return (
    html &&
    html
      .replace(/<(?:.|\n)*?>/gm, "")
      .replace(/(&rdquo;)/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&mdash;/g, "-")
      .replace(/&nbsp;/g, "")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/<[\w\s"':=\\/]*/, "")
  );
});
Vue.filter("timeFormat", tools.timeFormat);
Vue.filter("priceFormat", tools.priceFormat);
Vue.filter("timeIntervalChange", tools.timeIntervalChange);
Vue.filter("timeAgo", tools.timeAgo);
