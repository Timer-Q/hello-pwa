import React, { useEffect, useState } from 'react';
import { getData } from '../../services/requests/mi';
import './styles.scss';

interface IData {
	homepage: any;
}

interface IResult {
	code: number;
	message: string;
	data: IData;
}

export default function Mi() {
	const [data, setData] = useState({} as IData);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const result = (await getData()) as IResult;
		if (result.code === 0) {
			setData(result.data);
		}
	};

	const handleFloorItemClick = (data: any) => {
		console.log(data);
	};

	const { homepage } = data;
	if (homepage) {
		const { floors } = homepage;
		const floorNodes = floors.map((floor: any) => {
			const itemsData = floor?.data?.items;
			console.log('itemsData ', floor, itemsData);
			if (itemsData) {
				return (
					<div key={floor.floor_id} className={`floor ${floor.module_key}`}>
						{itemsData.map(({ item }: any, index: number) =>
							item && item.pic_url ? (
								<div
									key={item.pic_url}
									className='floor-item'
									onClick={() => handleFloorItemClick(item)}
								>
									<img className='floor-item-image' src={item.pic_url} alt={item.title} />
									<p className="floor-item-title">{item?.title || item.name}</p>
								</div>
							) : (
								<div key={index}></div>
							),
						)}
					</div>
				);
			}
			return null;
		});
		return <div className='container'>{floorNodes}</div>;
	}
	return <div>no data</div>;
}
