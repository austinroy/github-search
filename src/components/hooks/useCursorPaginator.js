import React, { useState } from 'react'

export const useCursorPaginator = () => {
	const [cursors, setCursors] = useState([]);
			return {
				current: cursors[0], 
				cursors, 
				next: (next) => { 
					setCursors([next, ...cursors]); 
				},
				previous: (n = 1) => { 
					setCursors(cursors.slice(n));
			}, 
	};
}
