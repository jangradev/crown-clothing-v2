import CategoryItem from '../category-item/category-item.cpmponent';
import './directory.style.scss';

const Directory = ({ categories }) => {
  return (
    <div className='categories-container'>
      {categories.map((item) => (
        <CategoryItem key={item.id} category={item} />
      ))}
    </div>
  );
};
export default Directory;
