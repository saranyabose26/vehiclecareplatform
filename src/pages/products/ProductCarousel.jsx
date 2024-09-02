import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import moment from "moment"
import {
	FaBox,
	FaClock,
	FaShoppingCart,
	FaStar,
	FaStore
} from 'react-icons/fa'

const ProductCarousel = () => {

	const { data: products, isLoading, error } = useGetTopProductsQuery()
	const settings = {
		dots: false,

		infinite: true,
		speed: 500,
		slidesToShow: 1,
		sildesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000
	}
	return (
		<div className="overflow-hidden relative  h-[40rem] outline-none mb:4 mt-[1rem] grid place-content-center rounded md:block shadow-3xl">
			{isLoading ? null : error ? (
				<Message varient={'danger'}>
					{error?.data?.message || error.message}
				</Message>
			) : <Slider {...settings} className="md:w-[48rem] shadow-3xl xl:w-[40rem] border-none focus:outline-none hover:outline-none  outline-none sm:w-[40rem] overflow-x-hidden  sm:block">
				{products?.map(({ image, _id, name, description, price, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
					<div className="flex flex-col items-center justify-center w-full pr-3 mx-auto overflow-x-hidden text-center rounded" key={_id}>
						<img src={`http://localhost:5000${image}`} alt={name} className="object-contain h-[20rem] p-5 mx-auto overflow-x-hidden rounded-lg " style={{ borderRadius: "3rem", width: "550px", outline: "0px" }} />
						<div className="flex flex-row justify-between mt-[2rem]">
							<div className="flex justify-center w-[20rem]">
								<div className="flex-grow one">
									<h2 className="p-2 text-2xl font-bold text-coral-red">{name}</h2>
									<p>${price}</p><br /><br />
									
								</div>


							</div>
							<div className="flex justify-evenly p-3 mr-16 w-[20rem]">
								<div className="one ">
									<p className="flex items-center mb-6 w-[13rem]">
										<FaStore className="mr-2" /> Brand : {brand}
									</p>
									<p className="flex items-center mb-6 w-[13rem]">
										<FaClock className="mr-2" /> Added : {moment(createdAt).fromNow()}
									</p>
									<p className="flex items-center mb-6 w-[13rem]">
										<FaStar className="mr-2" /> Reviews : {numReviews}
									</p>
								</div>
								<div className="two">
									<p className="flex items-center mb-6 w-[13rem]">
										<FaStar className="mr-2" /> Ratings : {Math.round(rating)}
									</p>
									<p className="flex items-center mb-6 w-[13rem]">
										<FaShoppingCart className="mr-2" /> Quantity : {quantity}
									</p>
									<p className="flex items-center mb-6 w-[13rem] overflow-auto">
										<FaBox className="mr-2" /> CountInStock : {countInStock}
									</p>
								</div>
							</div>
						</div>
					</div>
				))}


			</Slider>}

		</div>
	)
}

export default ProductCarousel