//This teaches typescript that .png is a valid important module
declare module "*.png" {
  const value: any;
  export default value;
}
