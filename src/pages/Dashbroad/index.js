export default function Dashbroad() {
  // CLASS
  const cls = {
    wrap: 'w-full',
    row1: 'grid grid-cols-2',
    grouptil: 'grid grid-cols-2',
    row2: 'grid grid-cols-4',
    col1: 'col-span-3',
    col2: 'col-span-1',
  }

  // RENDER
  return (
    <div className={cls.wrap}>
      <div className={cls.row1}>
        <div>14567 hình ảnh</div>
        <div className={cls.grouptil}>
          <div>273 albums</div>
          <div>1gb hình ảnh</div>
          <div>
            <span className="block">2019 - 2024</span>
            <span>6 năm và 57 tháng</span>
          </div>
          <div>
            <span className="block">142 hình mới</span>
            <span>2 albums mới</span>
          </div>
        </div>
      </div>
      <div className={cls.row2}>
        <div className={cls.col1}>
          hình ảnh mới
        </div>
        <div className={cls.col2}>
          hoạt động mới
        </div>
      </div>
    </div>
  )
}