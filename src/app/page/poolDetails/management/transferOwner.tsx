import { useState } from 'react'

import {
  Button,
  Row,
  Col,
  Input,
  Card,
  Space,
  Typography,
} from 'antd'
import { account } from '@senswap/sen-js'
import { usePool, useWallet } from 'senhub/providers'
import { explorer } from 'shared/util'
import IonIcon from 'shared/ionicon'


const TransferOwner = ({ address: poolAddress }: { address: string }) => {
  const { pools } = usePool()
  const { wallet: { address: walletAddress } } = useWallet();
  const [newOwner, setNewOwner] = useState('')
  const [loading, setLoading] = useState(false)
  const poolData = pools[poolAddress]

  const onTransferOwner = async () => {
    const { swap, wallet } = window.sentre
    if (!wallet) return
    setLoading(true)
    const { txId } = await swap.transferPoolOwnership(
      poolAddress,
      newOwner,
      wallet,
    )
    setLoading(false)
    if (!txId)
      return window.notify({ type: 'error', description: 'Transfer make failure.' })
    return window.notify({
      type: 'success',
      description: 'Transfer successfully. Click to view details',
      onClick: () => window.open(explorer(txId), '_blank'),
    })
  }

  if (!poolData || walletAddress !== poolData.owner) return null
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space align="start">
          <IonIcon name="information-circle-outline" />
          <Typography.Text>
            Your current account will lose the pool control when you transfer
            ownership.
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Card bodyStyle={{ padding: 8 }} bordered={false}>
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Typography.Text
                style={{ marginLeft: 12, fontSize: 12 }}
                type="secondary"
              >
                Transfer to Owner
              </Typography.Text>
            </Col>
            <Col span={24}>
              <Input
                placeholder="E.g. AgTMC..."
                value={newOwner}
                onChange={(e: any) => setNewOwner(e.target.value)}
                bordered={false}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          onClick={onTransferOwner}
          icon={<IonIcon name="airplane-outline" />}
          disabled={!account.isAddress(newOwner)}
          loading={loading}
          block
        >
          Transfer
        </Button>
      </Col>
    </Row>
  )
}
export default TransferOwner
