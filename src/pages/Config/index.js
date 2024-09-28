import { Form } from "../../components/commons/Form";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Cta from "../../components/commons/Cta";
import Box from "../../components/Box";

export default function Config() {
  // METHOD
  const handleEventSubmit = (e) => {
    e.preventDefault()
    console.log(e);
  }

  // CLASS
  const cls = {
    wrap: 'w-full max-w-2xl mx-auto',
    title: 'mb-10 text-2xl font-semi-bold',
    body: 'w-full',
    groupDimInput: 'grid grid-cols-7 mb-3',
    groupLabelInput: 'col-span-3',
    grid2: 'grid grid-cols-7 col-span-4',
    textInputGroup: 'mb-0 col-span-7 text-center',
    dimInputGroup: 'mb-0 col-span-3 text-center',
    dimInput: 'text-center',
    xIcon: 'flex items-center justify-center',
    cta: 'text-right',
  };
    
  // RENDER
  return (
    <div className={cls.wrap} data-config-page>
      <Box title="Cấu hình hệ thống" boxStyle="blue">
        <form onSubmit={handleEventSubmit}>
          <div className={cls.groupDimInput}>
            <Form.Label text='Tên trang' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input customClassGroup={cls.textInputGroup}/>
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Kích thước ảnh album' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input customClassGroup={cls.dimInputGroup} customClassInput={cls.dimInput}/>
              <span className={cls.xIcon}><FontAwesomeIcon icon={faX}/></span>
              <Form.Input customClassGroup={cls.dimInputGroup} customClassInput={cls.dimInput}/>
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Kích thước ảnh thumbnail' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input customClassGroup={cls.dimInputGroup} customClassInput={cls.dimInput}/>
              <span className={cls.xIcon}><FontAwesomeIcon icon={faX}/></span>
              <Form.Input customClassGroup={cls.dimInputGroup} customClassInput={cls.dimInput}/>
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Kích thước ảnh xem trực tiếp' customClass={cls.groupLabelInput}/>
            <div className={cls.grid2}>
              <Form.Input customClassGroup={cls.dimInputGroup} customClassInput={cls.dimInput}/>
              <span className={cls.xIcon}><FontAwesomeIcon icon={faX}/></span>
              <Form.Input customClassGroup={cls.dimInputGroup} customClassInput={cls.dimInput}/>
            </div>
          </div>
          <div className={cls.groupDimInput}>
            <Form.Label text='Chất lượng hình ảnh xem trực tiếp' subText='(1 - 100)' customClass={cls.groupLabelInput}>
            </Form.Label>
            <div className={cls.grid2}>
              <Form.Input customClassGroup={cls.textInputGroup}/>
            </div>
          </div>
          <div className={cls.cta}>
            <Cta type="submit">Đồng ý</Cta>
          </div>
        </form>
      </Box>
    </div>
  )
}
