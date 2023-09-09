import Image from 'next/image'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import Products from '@/components/Products'
import { ProductProps } from '../../types'
const inter = Inter({ subsets: ['latin'] })

interface Props {
  productData: ProductProps;
}
export default function Home({productData}:Props) {
  console.log(productData)
  return (
    <main>
      
      <div className='max-w-screen-2xl mx-auto'> 
      <Banner/>
      <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={productData} />
        </div>
      </div>
    </main>
  )
}


export const getServerSideProps=async ()=>{
  const resp=await fetch('https://fakestoreapiserver.reactbd.com/tech')
  const productData=await resp.json()
  return {props:{productData}}
}
