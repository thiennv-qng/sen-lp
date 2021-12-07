import { useMemo, useState } from 'react'

import { Button, Row, Col } from "antd"
import { utils } from '@senswap/sen-js'

import FeeInput from './FeeInput'
import { usePool, useWallet } from 'senhub/providers'
import IonIcon from 'shared/ionicon'
import { explorer } from 'shared/util'


//Fee decimal = 9
//however feeUI = Fee * 100 (%)
//-> FEE_DECIMALS_PERCENT = 9 - 2 = 7
const FEE_DECIMALS_PERCENT = 7

const Fee = ({ address: poolAddress }: { address: string }) => {
  const { pools } = usePool()
  const { wallet: { address: walletAddress } } = useWallet()
  const [feeRatio, setFeeRatio] = useState<string>('')
  const [taxRatio, setTaxRatio] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const poolData = pools[poolAddress]
  const { fee_ratio, tax_ratio } = poolData || {}

  const onUpdateFee = async () => {
    setLoading(true)
    const feeAmount = utils.decimalize(
      feeRatio || currentFee,
      FEE_DECIMALS_PERCENT,
    )
    const taxAmount = utils.decimalize(
      taxRatio || currentTax,
      FEE_DECIMALS_PERCENT,
    )
    // PRECISION
    const { swap, wallet } = window.sentre
    if (!wallet) return
    const { txId } = await swap.updateFee(
      feeAmount,
      taxAmount,
      poolAddress,
      wallet,
    )
    setLoading(false)
    if (!txId)
      return window.notify({
        type: 'error',
        description: 'Update fee make failure.',
      })
    setFeeRatio('')
    setTaxRatio('')
    return window.notify({
      type: 'success',
      description: 'Update fee successfully. Click to view details',
      onClick: () => window.open(explorer(txId), '_blank'),
    })
  }

  const currentFee = useMemo(() => {
    if (!fee_ratio) return '0'
    return utils.undecimalize(fee_ratio, FEE_DECIMALS_PERCENT)
  }, [fee_ratio])

  const currentTax = useMemo(() => {
    if (!tax_ratio) return '0'
    return utils.undecimalize(tax_ratio, FEE_DECIMALS_PERCENT)
  }, [tax_ratio])

  //Check owner in here
  if (!poolData || walletAddress !== poolData.owner) return null
  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <FeeInput
              title="Fee (%)"
              label="Current fee"
              ratio={feeRatio}
              currentRatio={currentFee}
              onChange={setFeeRatio}
            />
          </Col>
          <Col span={24}>
            <FeeInput
              title="Tax (%)"
              label="Current tax"
              ratio={taxRatio}
              currentRatio={currentTax}
              onChange={setTaxRatio}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button
          onClick={onUpdateFee}
          icon={<IonIcon name="cash-outline" />}
          block
          loading={loading}
          disabled={!taxRatio && !feeRatio}
        >
          Update Fee
        </Button>
      </Col>
    </Row>
  )
}
export default Fee
