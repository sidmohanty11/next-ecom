import { Layout } from "@components/common"
import { getConfig } from "@framework/api/config"
import { getAllProductsPaths } from "@framework/product/get-all-products-paths"
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next"

const ProductDetail = ({ product }:InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      {product.slug}
    </div>
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
    return {
      props: {
        product: {
          slug: params?.slug
        }
      }
    }
}

export default ProductDetail

ProductDetail.Layout = Layout