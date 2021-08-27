import type { InferGetStaticPropsType } from 'next'
import { getAllProducts } from '@framework/product/get-all-products'
import { getConfig } from '@framework/api/config'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Hero, Marquee } from "@components/ui"

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>){
  return (
    <>
      <Grid>
        {products.slice(0,3).map(product => (
          <ProductCard variant="simple" key={product.id} product={product} />
        ))}
      </Grid>
      <Hero
       headline="Tshirts, Jackets and Hats"
       description="Marshmallow tart jelly icing cotton candy tootsie roll cotton candy candy canes. Cake liquorice sesame snaps. Cupcake cake cheesecake pie marshmallow lollipop soufflé marshmallow dessert. Cheesecake jujubes halvah chupa chups lollipop tootsie roll. Jelly-o tiramisu jelly toffee cake croissant lemon drops pudding. Donut sesame snaps gummi bears toffee. Sesame snaps jelly-o oat cake chocolate marzipan cake lollipop. Gingerbread cheesecake jujubes fruitcake cake. Tiramisu cotton candy marzipan candy canes oat cake pudding bonbon."
      />
      <Marquee>
        {products.slice(0,3).map(product => (
          <ProductCard variant="slim" key={product.id} product={product} />
        ))}
      </Marquee>
    </>
  )
}

export async function getStaticProps() {
  const config = getConfig()
  const products = await getAllProducts(config)
  return {
    props: {
      products
    },
    revalidate: 4 * 60 * 60
  }
}

Home.Layout = Layout
