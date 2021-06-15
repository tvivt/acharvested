import './index.css';

const Learn = (props) => {
  const { code } = props;

  const tempFunc = () => {
    if (code === 99) {
      return null
    }
    if (code === 0 || code === 10){
      return 'COME SOON';
    }
    if (code === 1){
      return 'Unable Verify';
    }
  }

  const tempText = tempFunc();

  return (
    <div className='learn-container'>
      <div className='learn-header-bg'>
        <div className='learn-header-titles'>
          <h1 className='learn-header-title text-white'>Learn about airdrops</h1>
          <h4 className='learn-header-des text-gray-50'>New airdrops are released often. By following the below tips, you can improve your chances.
    Want to learn how?</h4>
        </div>
      </div>
      <div className='learn-content'>
        {tempText}
      </div>
    </div>
  )
}

export default Learn;