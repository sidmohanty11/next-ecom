import { Layout } from "@components/common"
import { getConfig } from "@framework/api/config"
import { getAllProductsPaths, getProduct } from "@framework/product"
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { ProductView } from "@components/product"

const ProductDetail = ({ product }:InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      { product && <ProductView product={product} />}
    </>
  )
}

// fetch all product slugs
export const getStaticPaths: GetStaticPaths = async () => {
  const config = getConfig()
  const { products } = await getAllProductsPaths(config)
  return {
    paths: products.map(p => ({ params: { slug: p.slug } })),
    fallback: false
  }
}

// provide specific data to the page
export const getStaticProps = async ({ params }:GetStaticPropsContext<{
   slug: string 
  }>) => {
    const config = getConfig()
    const { product } = await getProduct({
      config, variables: { slug: params?.slug }
    })
    
    return {
      props: {
        product
      }
    }
}

export default ProductDetail

ProductDetail.Layout = Layout