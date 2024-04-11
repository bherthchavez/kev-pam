
// eslint-disable-next-line react/prop-types
function Modal({ isOpen, onClose, children, notAttending }) {
  const showHideClassName = isOpen ? "block" : "hidden";

  return (
    <div className={`fixed z-50 inset-0 overflow-y-auto h-screen ${showHideClassName}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center  ">
     
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/60"></div>
        </div>
     
        <div
          className="inline-block bg-slate-600  text-center overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle  w-10/12 sm:max-w-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          
          {children}

          <div className="bg-slate-900 text-[#d4bfb2] hover:bg-slate-950  cursor-pointer px-4 py-5  sm:px-10 flex justify-center gap-6"
          onClick={onClose}
          >
           Exit
          
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
