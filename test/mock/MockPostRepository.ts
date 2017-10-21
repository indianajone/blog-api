
export default class MockPostRepository {

    public all() {
        return [
            {
                _id: 1,
                title: 'New Post',
                // tslint:disable-next-line:max-line-length
                // tslint:disable-next-line:object-literal-sort-keys
                body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure mollitia placeat rerum animi provident explicabo quod',
                image: 'http://via.placeholder.com/800x600',
                type: 'image',
                createdAt: '2017-10-11T08:20:00.685Z'
            }
        ];
    }

}
