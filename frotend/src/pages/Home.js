import React from 'react';
import CategoryList from '../componets/CategoryList';
import BannerProduct from '../componets/BannerProduct';
import StandardCardProduct from '../componets/StandardCardProduct';

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Categories Section */}
      <CategoryList />

      {/* Banner Section */}
      <BannerProduct />

      {/* Product Sections */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <StandardCardProduct category="teff" heading="Top Teff Products" />
        <StandardCardProduct category="coffee" heading="Top Coffee Products" />
        <StandardCardProduct category="redonion" heading="Top Red Onion Products" />
        <StandardCardProduct category="wheat" heading="Top Wheat Products" />
        <StandardCardProduct category="shero" heading="Top Shero Products" />
        <StandardCardProduct category="garlicpaste" heading="Top Garlic Paste Products" />
        <StandardCardProduct category="pepper" heading="Top Pepper Products" />
        <StandardCardProduct category="all vegetable" heading="Top Vegetable Products" />
      </div>
    </div>
  );
};

export default Home;
