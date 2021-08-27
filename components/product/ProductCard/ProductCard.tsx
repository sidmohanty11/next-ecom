import s from "./ProductCard.module.css"
import { Product } from "@common/types/product"
import { FC } from "react"
import Link from "next/link"
import Image from "next/image"

interface Props {
  product: Product
  variant?: "simple" | "slim"
}

const placeholderImg = "/placeholder.svg"

const ProductCard: FC<Props> = ({ product, variant = "simple" }) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <a className={s.root}>
        {variant === "slim" ? 
        <>
          <div className="flex items-center justify-center absolute z-20">
            <span className="bg-black text-white p-3 font-bold text-xl">{product.name}</span>
          </div>
          {product.images && (
            <Image
            alt={product.name ?? 
            "product image"} src={product.images[0].url ?? placeholderImg} 
            height={320} width={320} 
            quality="85" 
            layout="fixed"
            className={s.productImage}
            />
            )}
        </> :
        <>
        <div className={s.productBg}></div>
          <div className={s.productTag}>
            <h3 className={s.productTitle}><span>{product.name}</span></h3>        
            <span className={s.productPrice}>{product.price.value} {product.price.currencyCode}</span>
          </div>
          {product.images && (
            <Image
            alt={product.name ?? 
            "product image"} src={product.images[0].url ?? placeholderImg} 
            height={540} width={540} 
            quality="85" 
            layout="responsive"
            className={s.productImage}
            />
            )}
          </>
        }  
      </a>
    </Link>
  )
}

export default ProductCard