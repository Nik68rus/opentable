import { PRICE } from "@prisma/client"

interface Props {
  price: PRICE
}
const Price = ({price}: Props) => {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return <>
        <span>$$</span><span className="text-gray-300">$$</span>
      </>
    } else if (price === PRICE.REGULAR) {
      return <>
        <span>$$$</span><span className="text-gray-300">$</span>
      </>
    } else {
      return <>
        <span>$$$$</span>
      </>
    }
  }
  return <p className="flex mr-3">{renderPrice()}</p>
}

export default Price