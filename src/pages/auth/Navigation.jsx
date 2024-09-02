import { useEffect, useState } from "react";

import {
	AiOutlineHome,
	AiOutlineShopping,
	AiOutlineLogin,
	AiOutlineUserAdd,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link ,useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../products/FavoritesCount";
const Navigation = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const [dropDownOpen, setDropDownOpen] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleDropDown = () => {
		setDropDownOpen(!dropDownOpen);
	};
	const toggleShowSidebar = () => {
		setShowSidebar(!showSidebar);
	};
	const closeSidebar = () => {
		setShowSidebar(false);
	};
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation(); // useLocation hook to track route changes

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (showSidebar) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [showSidebar]);
	useEffect(() => {
		setDropDownOpen(false);
	}, [location]);

	useEffect(() => {
		if (showSidebar) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [showSidebar]);

	const { cartItems } = useSelector(state => state.cart)
	return (
		<header className="z-10 flex items-center justify-between w-full px-10 py-5 mb-10 shadow-3xl" >
			<div className="mt-2 logo">
				<a href="/">
					<img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032" width={129}
						height={490}
						className="m-0 w-[129px] h-[59px]" alt="" />

				</a>
			</div>

			<div className="flex justify-center gap-10 mt-[-10px] ">	<Link
				to="/"
				className="flex items-center transition-transform transform hover:translate-x-4"
			>
				<AiOutlineHome className="mr-3 mt-[3rem]" color="#FF6452" size={26} />
				<span className=" mt-[3rem] pt-1 text-2xl text-slate-gray">
					Home
				</span>
			</Link>
				<Link
					to="/shop"
					className="flex items-center transition-transform transform hover:translate-x-4"
				>
					<AiOutlineShopping color="#FF6452" className="mr-3 mt-[3rem]" size={26} />
					<span className=" mt-[52px] text-2xl text-slate-gray">
						Shop
					</span>
				</Link>
				<Link
					to="/cart"
					className="flex items-center transition-transform transform hover:translate-x-4"
				>
					<AiOutlineShoppingCart color="#FF6452" className=" mr-3 mt-[3rem]" size={26} />
					<span className="  mt-[52px] text-2xl text-slate-gray">
						Cart
					</span>
					{""}
					<div className="absolute top-9">
						{cartItems.length > 0 && (
							<span>
								<span className="h-[18px]  px-1 py-[2px] text-center w-[1px] text-sm text-white bg-coral-red rounded-full">
									{cartItems.reduce((a, p) => Number(a + p.qty), 0)}
								</span>
							</span>
						)}
					</div>
				</Link>
				<Link
					to="/favorite"
					className="flex items-center transition-transform transform hover:translate-x-4"
				>
					<FaHeart color="#FF6452" className=" mr-3 mt-[3rem]" size={26} />
					<span className="  mt-[52px] text-2xl text-slate-gray">
						Favorite
					</span>
					{""}
					<FavoritesCount />
				</Link>
			</div>
			<div className="relative " >
				<button
					onClick={toggleDropDown}
					className="flex items-center to-gray-800 focus:outline-none"
				>
					{userInfo ? (
						<span className="text-slate-gray">{userInfo.username}</span>
					) : (
						<></>
					)}
					{userInfo && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-4 w-4 ml-1 ${dropDownOpen ? "transform rotate-180" : ""
								}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
							/>
						</svg>
					)}
				</button>
				{dropDownOpen && userInfo && (
					<ul
						className={` z-50 absolute top-10 right-10 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20 " : "-top-80"
							}`}
					>
						<button className="absolute right-0 h-6 w-6 p-1 flex items-center justify-center text-white bg-red-500 rounded-full top-[-10px] shadow-md transition-all duration-300 ease-in-out hover:bg-red-600 hover:scale-110" onClick={() => setDropDownOpen(false)}>
  &times;
</button>

						{userInfo.isAdmin && (
							<> 
								<li className="pt-4 ">
									<Link
										to="/admin/dashboard"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										to="/admin/allproductslist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Products
									</Link>
								</li>
								<li>
									<Link
										to="/admin/categorylist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Category
									</Link>
								</li>
								<li>
									<Link
										to="/admin/orderlist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Orders
									</Link>
								</li>
								<li>
									<Link
										to="/admin/userlist"
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Users
									</Link>
								</li>
							</>
						)}
						<li>
							<Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
								Profile
							</Link>
						</li>
						<li>
							<button
								onClick={logoutHandler}
								className="block w-full px-4 py-2 text-left hover:bg-gray-100"
							>
								Logout
							</button>
						</li>
					</ul>
				)}
			</div>
			{!userInfo && (
				<ul className="flex mr-10">
					<li>
						<Link
							to="/login"
							className="flex items-center mr-10 transition-transform transform "
						>
							<AiOutlineLogin className=" mr-3 mt-[3rem]" size={26} />
							<span className="  mt-[3rem] pt-1  text-slate-gray">
								Login
							</span>
							{""}
						</Link>
					</li>
					<li>
						<Link
							to="/register"
							className="flex items-center transition-transform transform "
						>
							<AiOutlineUserAdd className=" mr-3 mt-[3rem]" size={26} />
							<span className="  mt-[3rem] pt-1 text-slate-gray">
								Register
							</span>
							{""}
						</Link>
					</li>
				</ul>
			)}


		</header >
	);
};

export default Navigation;
