import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helper/productcatagory';
import VerticalCard from '../componets/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filter_Product.url, {
      method: SummaryApi.filter_Product.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList.length ? filterCategoryList : [], // Fetch all products if no category is selected
      }),
    });

    const dataResponse = await response.json();
    let sortedData = dataResponse?.data || [];

    // Sort the data if a sorting option is selected
    if (sortBy === "asc") {
      sortedData = sortedData.sort((a, b) => a.selling - b.selling);
    } else if (sortBy === "dsc") {
      sortedData = sortedData.sort((a, b) => b.selling - a.selling);
    }

    setData(sortedData);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;

    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList, sortBy]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .filter((categoryKeyName) => selectCategory[categoryKeyName]);

    setFilterCategoryList(arrayOfCategory);

    // Format URL change when checkbox is checked
    const urlFormat = arrayOfCategory
      .map((el) => `category=${el}`)
      .join("&");

    navigate(`/product-category?${urlFormat}`);
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* Sort By */}
          <div>
            <h3 className="text-lg uppercase font-bold text-blue-600 border-b pb-1 border-gray-300">
              Sort by
            </h3>
            <form className="text-base flex flex-col gap-4 py-3">
              <label
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  sortBy === "asc"
                    ? "bg-blue-100 text-blue-800 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                  className="cursor-pointer appearance-none w-5 h-5 border border-gray-400 checked:bg-blue-600 rounded-full"
                />
                <span>Price - Low to High</span>
              </label>
              <label
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  sortBy === "dsc"
                    ? "bg-blue-100 text-blue-800 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                  className="cursor-pointer appearance-none w-5 h-5 border border-gray-400 checked:bg-blue-600 rounded-full"
                />
                <span>Price - High to Low</span>
              </label>
            </form>
          </div>

          {/* Filter by Category */}
          <div>
            <h3 className="text-lg uppercase font-bold text-blue-600 border-b pb-1 border-gray-300">
              Category
            </h3>
            <form className="text-base flex flex-col gap-3 py-2">
              {productCategory.map((categoryName) => (
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  key={categoryName?.value}
                >
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                    className="cursor-pointer appearance-none w-5 h-5 border border-gray-400 checked:bg-blue-600 rounded"
                  />
                  <label
                    htmlFor={categoryName?.value}
                    className="cursor-pointer text-gray-800 hover:text-blue-600"
                  >
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product List */}
        <div className="px-4">
          <p className="font-medium text-blue-900 text-xl my-2">
            Search Results: {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && <VerticalCard data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
