import { Col, Card, Tabs } from 'antd'
import { usePool, useWallet } from 'senhub/providers'


import Fee from './fee'
import Freeze from './freeze'
import TransferOwner from './transferOwner'

export default function PoolManagement({
  address: poolAddress,
}: {
  address: string
}) {
  const { wallet: { address: walletAddress } } = useWallet()
  const { pools } = usePool()
  const poolData = pools[poolAddress]
  if (!poolData || walletAddress !== poolData.owner) return null
  return (
    <Col
      xs={{ span: 24, order: 6 }}
      sm={{ span: 12, order: 6 }}
      xl={{ span: 8, order: 6 }}
    >
      <Card className="shadowed" style={{ minHeight: 285 }} bordered={false}>
        <Tabs>
          <Tabs.TabPane key="freeze-thaw" tab="Freeze/Thaw">
            <Freeze address={poolAddress} />
          </Tabs.TabPane>
          <Tabs.TabPane key="fee" tab="Fee">
            <Fee address={poolAddress}></Fee>
          </Tabs.TabPane>
          <Tabs.TabPane key="transfer-owner" tab="Transfer Owner">
            <TransferOwner address={poolAddress} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </Col>
  )
}
