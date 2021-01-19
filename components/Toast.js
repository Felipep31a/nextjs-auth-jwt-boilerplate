const Toast = ({ msg, handleShow, bgColor}) => (
  <div className={`toast show position-fixed text-light ${bgColor}`} 
    style={{top: '5px', right: '5px', zIndex: 9, minWidth: '280px'}}>
    <div className={`toast-header ${bgColor} text-light`}>
      <strong className="mr-auto" style={{color: 'white', fontWeight: 'bold'}}>
        {msg.title}
        </strong>

      <button type="button" className="ml-2 mb-1 close" 
          data-dismiss="toast" style={{outline: 'none'}}
          onClick={handleShow}
      >x</button>
    </div>

    <div className="toast-body">
      {msg.msg}
  </div>
  </div>
)

export default Toast