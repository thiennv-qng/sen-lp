import { Card, Tabs } from "antd"
import AllPools from "./allPools"
import Transactions from "./transactions"
import MyPools from "./myPools"
import NewPool from "./newPool"

const SideBar = () => {
  return <Card bodyStyle={{ padding: 0 }} bordered={false}>
    <Tabs defaultActiveKey="all-pools" tabBarExtraContent={<NewPool />} style={{ padding: 16 }}>
      <Tabs.TabPane key="all-pools" tab="All pools">
        <AllPools />
      </Tabs.TabPane>
      <Tabs.TabPane key="my-pools" tab="My pools">
        <MyPools />
      </Tabs.TabPane>
      <Tabs.TabPane key="transactions" tab="transactions">
        <Transactions />
      </Tabs.TabPane>
    </Tabs>
  </Card>
}

export default SideBar