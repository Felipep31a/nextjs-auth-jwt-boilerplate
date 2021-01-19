const Loading = () => (
    <div className="spinner-border" role="status" style={{
      position: 'absolute', zIndex:9999, left: '47%', top: '5%',
      backgroundColor: 'rgba(255, 255, 255,0.5)'}}>
      <span className="sr-only">Loading...</span>
    </div>
)

export default Loading