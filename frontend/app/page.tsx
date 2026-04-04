export default function Home() {
  return (
    <>
      <section className="intro">
        <h2>🛍️ Giới thiệu về TTD Shop</h2>
        <p>
          TTD Shop chuyên cung cấp các sản phẩm công nghệ chính hãng như laptop,
          đồng hồ thông minh, tai nghe và phụ kiện điện tử.
        </p>
      </section>

      <section className="products">

        <div className="product-card">
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/smart_band_4__1.png" width="150" alt="smart watch"/>
          <h3>Đồng hồ thông minh Huawei Watch Fit 4</h3>
          <p>2.740.000đ</p>
        </div>

        <div className="product-card">
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_8__4_84.png" width="150" alt="Laptop"/>
          <h3>Laptop Lenovo LOQ 15ARP9 83JC007HVN</h3>
          <p>19.990.000đ</p>
        </div>

        <div className="product-card">
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-max-1_1.png" width="150" alt="Tai nghe"/>
          <h3>Tai nghe chụp tai chống ồn Apple AirPods Max 2024</h3>
          <p>14.290.000đ</p>
        </div>
        
        <div className="product-card">
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_100_1_2__2_2.png" width="150" alt="Tablet"/> 
          <h3>iPad Pro M4 11 inch Wifi 256GB</h3>
          <p>27.590.000đ</p>
        </div>

      </section>
    </>
  );
}