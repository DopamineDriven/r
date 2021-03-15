import { useState } from 'react';
import { Submission } from 'snoowrap/dist/objects';
import { CustomSubmissionType } from '../../types/data-handling';

const usePagination = (
	data: CustomSubmissionType[],
	itemsPerPage: 10
) => {
	const [currentPage, setCurrentPage] = useState(1);

	const maxPage = Math.ceil(data.length / itemsPerPage);

	function currentData() {
		const begin = (currentPage - 1) * itemsPerPage;
		const end = begin + itemsPerPage;
		return data.slice(begin, end);
	}
	function next() {
		setCurrentPage(currentPage =>
			Math.min(currentPage + 1, maxPage)
		);
	}
	return { next, currentData, currentPage, maxPage };
};
export default usePagination;
