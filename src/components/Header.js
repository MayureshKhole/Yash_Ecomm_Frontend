import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-18  bg-[#F3F1EF]  fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
            <div className='text-3xl mb-3 font-merienda  font-semibold'>
                <Link to={"/"}>
                    Lightify
                </Link>
            </div>

            {/* <div className='hidden lg:flex items-center w-96 justify-between  bg-slate-100 border rounded-md focus-within:shadow pl-2'>
                <input type='text' placeholder='Search for Products, Brand and More' className='w-full bg-slate-100 outline-none' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-[#ffc470] flex items-center justify-center  text-black'>
                  <GrSearch />
                </div>
            </div> */}

            <div className='text-3xl font-serif font-bold'>
                
            </div>



            <div className='flex items-center gap-10'>
                
                <div className='relative flex justify-center'>
            
                  {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <div className='flex gap-3'>
                              <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                              <div className='text-2xl mt-1 '>{user.name}</div>
                            </div>
                          )
                          : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                  }
                  
                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <div>
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Orders</Link>
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Wishlist</Link>
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                              </div>
                            )
                          }
                         
                        </nav>
                      </div>
                    )
                  }
                 
                </div>

                  {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><FaShoppingCart/></span>
      
                          <div className='bg-[#ffc470] text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }
              


                <div>
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-black bg-[#ffc470] hover:bg-[#CE9661]'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-[#ffc470] hover:bg-[#ffc470]'>Login</Link>
                    )
                  }
                    
                </div>

            </div>

      </div>
    </header>
  )
}

export default Header