export const HOST = "https://teachmekanji.herokuapp.com";

export const PORT = 80;

export const DURATION = 1200000; // 20 minutes

export const AUTHOR = "@hitamu";

export const CHANNEL = "#tmk";

// Heroku server timezone GMT(+0)
// Vietnamese GMT(+7)
export const TEACHING_HOURS = [
  {hour: 1,  minute: 45},
  {hour: 6, minute: 15},
  {hour: 10, minute: 15}
];