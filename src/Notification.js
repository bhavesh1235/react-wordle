export default  Notification = (props) => {
    const { timeOut ,notificationVisible ,setNotificationVisible ,notificationMessage } = props;
    if (notificationVisible) {
      setTimeout(() => {
        if (notificationVisible) {
          setNotificationVisible(false);
        }
      }, timeOut);
    }
    return (
      <div
        className={
          "notification " + (notificationVisible ? "opacity-100" : "opacity-0")
        }
      >
        {notificationMessage}
      </div>
    );
  };
