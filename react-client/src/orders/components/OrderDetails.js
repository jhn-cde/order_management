export const OrderDetails = ({ order }) => {
  return (
    <table className="table table-borderless">
      <tbody>
        <tr>
          <td>Customer</td>
          <td>{order.Consumer}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{order.Status}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{order.Date}</td>
        </tr>
      </tbody>
    </table>
  )
} 